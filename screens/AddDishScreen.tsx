
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import colors from "../constants/colors";
import typography from "../constants/typography";

export type Dish = {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
  available: boolean;
};

type AddDishScreenProps = {
  onSave: (dish: Dish) => void;
  onCancel: () => void;
  dishToEdit?: Dish | null;
};

type FormErrors = {
  name?: string;
  description?: string;
  course?: string;
  price?: string;
};

const courses = ["Starter", "Main Course", "Dessert", "Beverage"];
const MAX_NAME_LENGTH = 80;
const MAX_DESCRIPTION_LENGTH = 500;

export default function AddDishScreen({
  onSave,
  onCancel,
  dishToEdit,
}: AddDishScreenProps) {
  const isEditing = Boolean(dishToEdit);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(true);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (dishToEdit) {
      setName(dishToEdit.name);
      setDescription(dishToEdit.description);
      setCourse(dishToEdit.course);
      setPrice(String(dishToEdit.price));
      setAvailable(dishToEdit.available ?? true);
    } else {
      setName("");
      setDescription("");
      setCourse("");
      setPrice("");
      setAvailable(true);
    }

    setErrors({});
  }, [dishToEdit]);

  function updateField<K extends keyof FormErrors>(
    field: K,
    value: string,
    setter: (value: string) => void
  ) {
    setter(value);

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
  }

  function validateForm(): boolean {
    const nextErrors: FormErrors = {};

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    const trimmedPrice = price.trim();

    if (!trimmedName) {
      nextErrors.name = "Enter a name for this dish.";
    } else if (trimmedName.length > MAX_NAME_LENGTH) {
      nextErrors.name = `The dish name must not exceed ${MAX_NAME_LENGTH} characters.`;
    }

    if (!trimmedDescription) {
      nextErrors.description = "Enter a description for this dish.";
    } else if (trimmedDescription.length > MAX_DESCRIPTION_LENGTH) {
      nextErrors.description =
        `The description must not exceed ${MAX_DESCRIPTION_LENGTH} characters.`;
    }

    if (!course) {
      nextErrors.course = "Select a course for this dish.";
    } else if (!courses.includes(course)) {
      nextErrors.course = "Select a valid course from the options.";
    }

    if (!trimmedPrice) {
      nextErrors.price = "Enter a price for this dish.";
    } else if (!/^\d+([.,]\d{1,2})?$/.test(trimmedPrice)) {
      nextErrors.price =
        "Enter a valid price, such as 145, 145.50 or 145,50. Use up to 2 decimal places.";
    } else {
      const parsedPrice = Number(trimmedPrice.replace(",", "."));

      if (!Number.isFinite(parsedPrice)) {
        nextErrors.price = "This price is too large or is not a valid number.";
      } else if (parsedPrice <= 0) {
        nextErrors.price = "The price must be greater than R0.00.";
      } else if (parsedPrice > 1000000) {
        nextErrors.price = "The price cannot exceed R1,000,000.00.";
      }
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      Alert.alert(
        "Check Your Information",
        "Some details are missing or invalid. Review the messages below the highlighted fields and correct them before saving."
      );
      return false;
    }

    return true;
  }

  function handleSave() {
    if (!validateForm()) {
      return;
    }

    const parsedPrice = Number(price.trim().replace(",", "."));

    const savedDish: Dish = {
      id: dishToEdit?.id ?? Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      course,
      price: parsedPrice,
      available,
    };

    onSave(savedDish);
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity onPress={onCancel} style={styles.backButton}>
          <Text style={styles.backText}>‹  Back to Menu</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.eyebrow}>CHRISTOFFEL'S MENU</Text>
          <Text style={[typography.screenTitle, styles.title]}>
            {isEditing ? "Edit Dish" : "Add New Dish"}
          </Text>
          <Text style={styles.subtitle}>
            {isEditing
              ? "Update the details and availability of this dish."
              : "Enter the dish details below. Fields marked with * are required."}
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Dish Name *</Text>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            value={name}
            onChangeText={(value) =>
              updateField("name", value, setName)
            }
            placeholder="e.g. Creamy Chicken Alfredo"
            placeholderTextColor={colors.muted}
            maxLength={MAX_NAME_LENGTH}
            autoCapitalize="words"
            returnKeyType="next"
            accessibilityLabel="Dish name, required"
          />
          <View style={styles.helperRow}>
            {errors.name ? (
              <Text style={styles.errorText}>{errors.name}</Text>
            ) : (
              <Text style={styles.helperText}>Enter a clear dish name.</Text>
            )}
            <Text style={styles.characterCount}>
              {name.length}/{MAX_NAME_LENGTH}
            </Text>
          </View>

          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[
              styles.input,
              styles.descriptionInput,
              errors.description && styles.inputError,
            ]}
            value={description}
            onChangeText={(value) =>
              updateField("description", value, setDescription)
            }
            placeholder="Describe the ingredients and preparation..."
            placeholderTextColor={colors.muted}
            multiline
            textAlignVertical="top"
            maxLength={MAX_DESCRIPTION_LENGTH}
            accessibilityLabel="Dish description, required"
          />
          <View style={styles.helperRow}>
            {errors.description ? (
              <Text style={styles.errorText}>{errors.description}</Text>
            ) : (
              <Text style={styles.helperText}>
                Include the main ingredients or preparation.
              </Text>
            )}
            <Text style={styles.characterCount}>
              {description.length}/{MAX_DESCRIPTION_LENGTH}
            </Text>
          </View>

          <Text style={styles.label}>Course *</Text>
          <View style={styles.courseContainer}>
            {courses.map((item) => {
              const selected = course === item;

              return (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.courseOption,
                    selected && styles.selectedCourse,
                    errors.course && styles.courseOptionError,
                  ]}
                  onPress={() => {
                    setCourse(item);
                    setErrors((currentErrors) => ({
                      ...currentErrors,
                      course: undefined,
                    }));
                  }}
                  activeOpacity={0.8}
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                >
                  <Text
                    style={[
                      styles.courseText,
                      selected && styles.selectedCourseText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {errors.course ? (
            <Text style={styles.errorText}>{errors.course}</Text>
          ) : (
            <Text style={styles.helperText}>
              Select the category that best describes the dish.
            </Text>
          )}

          <Text style={styles.label}>Price (ZAR) *</Text>
          <View
            style={[
              styles.priceContainer,
              errors.price && styles.inputError,
            ]}
          >
            <Text style={styles.currency}>R</Text>
            <TextInput
              style={styles.priceInput}
              value={price}
              onChangeText={(value) =>
                updateField("price", value, setPrice)
              }
              placeholder="145.00"
              placeholderTextColor={colors.muted}
              keyboardType="decimal-pad"
              maxLength={15}
              returnKeyType="done"
              accessibilityLabel="Dish price in South African rand, required"
            />
          </View>
          {errors.price ? (
            <Text style={styles.errorText}>{errors.price}</Text>
          ) : (
            <Text style={styles.helperText}>
              Enter a positive amount with up to two decimal places.
              For example, 145.50.
            </Text>
          )}

          <View style={styles.availabilityCard}>
            <View style={styles.availabilityCopy}>
              <Text style={styles.availabilityTitle}>
                Dish Availability
              </Text>
              <Text style={styles.availabilityDescription}>
                {available
                  ? "Customers can order this dish."
                  : "This dish is currently unavailable."}
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  available ? styles.availableBadge : styles.unavailableBadge,
                ]}
              >
                <View
                  style={[
                    styles.statusDot,
                    available
                      ? styles.availableDot
                      : styles.unavailableDot,
                  ]}
                />
                <Text
                  style={[
                    styles.statusText,
                    available
                      ? styles.availableText
                      : styles.unavailableText,
                  ]}
                >
                  {available ? "Available" : "Unavailable"}
                </Text>
              </View>
            </View>

            <Switch
              value={available}
              onValueChange={setAvailable}
              trackColor={{
                false: colors.border,
                true: colors.gold,
              }}
              thumbColor={available ? colors.burgundy : "#FFFFFF"}
              accessibilityLabel="Dish availability"
            />
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.85}
            accessibilityRole="button"
          >
            <Text style={styles.saveButtonText}>
              {isEditing ? "Save Changes" : "Save Dish"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCancel}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          <Text style={styles.requiredNote}>
            * Required fields
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  content: {
    padding: 22,
    paddingBottom: 40,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    marginBottom: 20,
  },
  backText: {
    color: colors.burgundy,
    fontSize: 15,
    fontWeight: "600",
  },
  header: {
    marginBottom: 24,
  },
  eyebrow: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 8,
  },
  title: {
    color: colors.burgundy,
    marginBottom: 8,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
  },
  form: {
    backgroundColor: colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
  },
  label: {
    ...typography.label,
    color: colors.burgundy,
    marginBottom: 8,
    marginTop: 17,
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 12,
    color: colors.black,
    fontSize: 15,
    backgroundColor: colors.cream,
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 1.5,
  },
  descriptionInput: {
    minHeight: 110,
  },
  helperRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 6,
  },
  helperText: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
    flexShrink: 1,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
    flex: 1,
  },
  characterCount: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 6,
  },
  courseContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  courseOption: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 13,
    backgroundColor: colors.cream,
  },
  courseOptionError: {
    borderColor: colors.error,
  },
  selectedCourse: {
    backgroundColor: colors.burgundy,
    borderColor: colors.burgundy,
  },
  courseText: {
    fontSize: 13,
    color: colors.black,
    fontWeight: "500",
  },
  selectedCourseText: {
    color: colors.white,
  },
  priceContainer: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 13,
    backgroundColor: colors.cream,
  },
  currency: {
    color: colors.burgundy,
    fontSize: 16,
    fontWeight: "700",
    marginRight: 8,
  },
  priceInput: {
    flex: 1,
    color: colors.black,
    fontSize: 15,
    paddingVertical: 10,
  },
  availabilityCard: {
    marginTop: 24,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    backgroundColor: colors.cream,
  },
  availabilityCopy: {
    flex: 1,
  },
  availabilityTitle: {
    color: colors.burgundy,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 5,
  },
  availabilityDescription: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 9,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 5,
    gap: 6,
  },
  availableBadge: {
    backgroundColor: "#E8F4E9",
  },
  unavailableBadge: {
    backgroundColor: "#FCE9E7",
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  availableDot: {
    backgroundColor: colors.success,
  },
  unavailableDot: {
    backgroundColor: colors.error,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },
  availableText: {
    color: colors.success,
  },
  unavailableText: {
    color: colors.error,
  },
  saveButton: {
    minHeight: 52,
    borderRadius: 12,
    backgroundColor: colors.burgundy,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  saveButtonText: {
    ...typography.button,
    color: colors.white,
  },
  cancelButton: {
    minHeight: 46,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  cancelButtonText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "600",
  },
  requiredNote: {
    color: colors.muted,
    fontSize: 11,
    textAlign: "center",
    marginTop: 8,
  },
});
