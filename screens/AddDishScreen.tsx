
import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

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

const C = {
  cream: '#FAF6ED',
  burgundy: '#5A1718',
  burgundyLight: '#7A3030',
  gold: '#D4B16A',
  white: '#FFFFFF',
  text: '#292321',
  muted: '#857C74',
  border: '#E9E0D4',
  green: '#356B48',
  red: '#A44444',
  softGreen: '#E8F1E8',
};

const COURSES = ['Starter', 'Main Course', 'Dessert', 'Beverage'];

export default function AddDishScreen({
  onSave,
  onCancel,
  dishToEdit,
}: AddDishScreenProps) {
  const isEditing = Boolean(dishToEdit);

  const [name, setName] = useState(dishToEdit?.name ?? '');
  const [description, setDescription] = useState(
    dishToEdit?.description ?? ''
  );
  const [course, setCourse] = useState(
    dishToEdit?.course ?? 'Main Course'
  );
  const [price, setPrice] = useState(
    dishToEdit ? String(dishToEdit.price) : ''
  );
  const [available, setAvailable] = useState(
    dishToEdit?.available ?? true
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update the form when editing a different dish.
  useEffect(() => {
    setName(dishToEdit?.name ?? '');
    setDescription(dishToEdit?.description ?? '');
    setCourse(dishToEdit?.course ?? 'Main Course');
    setPrice(dishToEdit ? String(dishToEdit.price) : '');
    setAvailable(dishToEdit?.available ?? true);
    setErrors({});
  }, [dishToEdit]);

  // Validate all form fields.
  const validate = () => {
    const nextErrors: Record<string, string> = {};

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    const normalizedPrice = price.trim().replace(',', '.');
    const numericPrice = Number(normalizedPrice);

    if (!trimmedName) {
      nextErrors.name = 'Please enter a dish name.';
    } else if (trimmedName.length > 80) {
      nextErrors.name = 'Dish name must be 80 characters or fewer.';
    }

    if (!trimmedDescription) {
      nextErrors.description = 'Please enter a short description.';
    } else if (trimmedDescription.length > 500) {
      nextErrors.description =
        'Description must be 500 characters or fewer.';
    }

    if (!price.trim()) {
      nextErrors.price = 'Please enter a price.';
    } else if (!/^\d+([.,]\d{1,2})?$/.test(price.trim())) {
      nextErrors.price =
        'Enter a valid price, e.g. 125 or 125.50.';
    } else if (
      !Number.isFinite(numericPrice) ||
      numericPrice <= 0 ||
      numericPrice > 1000000
    ) {
      nextErrors.price =
        'Price must be greater than R0 and no more than R1,000,000.';
    }

    if (!COURSES.includes(course)) {
      nextErrors.course = 'Please choose a valid category.';
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  // Save a new dish or edited dish.
  const handleSave = () => {
    if (!validate()) {
      return;
    }

    const normalizedPrice = Number(
      price.trim().replace(',', '.')
    );

    const dish: Dish = {
      id: dishToEdit?.id ?? `dish-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      course,
      price: normalizedPrice,
      available,
    };

    onSave(dish);
  };

  // Update a field and clear its individual error.
  const updateField = (
    field: string,
    setter: (value: string) => void,
    value: string
  ) => {
    setter(value);

    if (errors[field]) {
      setErrors((previous) => ({
        ...previous,
        [field]: '',
      }));
    }
  };

  // Confirm before discarding unsaved changes.
  const handleCancel = () => {
    if (
      name.trim() ||
      description.trim() ||
      price.trim()
    ) {
      Alert.alert(
        'Discard changes?',
        'Your unsaved changes will be lost.',
        [
          {
            text: 'Keep editing',
            style: 'cancel',
          },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: onCancel,
          },
        ]
      );
    } else {
      onCancel();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={C.burgundy}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.screen}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Burgundy title banner */}
          <View style={styles.header}>
            <Pressable
              onPress={handleCancel}
              style={styles.backButton}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <Text style={styles.backArrow}>‹</Text>
              <Text style={styles.backText}>Menu</Text>
            </Pressable>

            <View style={styles.brandRow}>
              <View style={styles.brandCircle}>
                <Text style={styles.brandLetter}>C</Text>
              </View>

              <View>
                <Text style={styles.brandName}>CHRISTOFFEL'S</Text>
                <Text style={styles.brandTagline}>
                  THE ART OF GOOD DINING
                </Text>
              </View>
            </View>

            <Text style={styles.headerEyebrow}>
              {isEditing ? 'REFINE YOUR MENU' : 'EXPAND YOUR MENU'}
            </Text>

            <Text style={styles.headerTitle}>
              {isEditing ? 'Edit Dish' : 'Add a Dish'}
            </Text>

            <Text style={styles.headerDescription}>
              {isEditing
                ? 'Update the details of your selected dish.'
                : 'Introduce something delicious to your menu.'}
            </Text>

            <View style={styles.headerGoldLine} />
            <View style={styles.headerCircleDecoration} />
          </View>

          <View style={styles.content}>
            {/* Form introduction */}
            <View style={styles.introBlock}>
              <Text style={styles.sectionEyebrow}>DISH DETAILS</Text>
              <Text style={styles.sectionTitle}>The essentials</Text>
              <Text style={styles.sectionDescription}>
                Complete the details below to keep your menu accurate and
                inviting.
              </Text>
            </View>

            {/* Dish name */}
            <View style={styles.field}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Dish name</Text>
                <Text style={styles.required}>REQUIRED</Text>
              </View>

              <TextInput
                value={name}
                onChangeText={(value) =>
                  updateField('name', setName, value)
                }
                placeholder="e.g. Grilled Rib-Eye Steak"
                placeholderTextColor="#A89D91"
                style={[
                  styles.input,
                  errors.name ? styles.inputError : null,
                ]}
                maxLength={80}
                returnKeyType="next"
                accessibilityLabel="Dish name"
              />

              <View style={styles.helperRow}>
                {errors.name ? (
                  <Text style={styles.errorText}>{errors.name}</Text>
                ) : (
                  <Text style={styles.helperText}>
                    Give your dish a clear, memorable name.
                  </Text>
                )}

                <Text style={styles.counter}>{name.length}/80</Text>
              </View>
            </View>

            {/* Description */}
            <View style={styles.field}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Description</Text>
                <Text style={styles.required}>REQUIRED</Text>
              </View>

              <TextInput
                value={description}
                onChangeText={(value) =>
                  updateField('description', setDescription, value)
                }
                placeholder="Describe the ingredients, flavour and presentation..."
                placeholderTextColor="#A89D91"
                style={[
                  styles.input,
                  styles.descriptionInput,
                  errors.description ? styles.inputError : null,
                ]}
                multiline
                textAlignVertical="top"
                maxLength={500}
                accessibilityLabel="Dish description"
              />

              <View style={styles.helperRow}>
                {errors.description ? (
                  <Text style={styles.errorText}>
                    {errors.description}
                  </Text>
                ) : (
                  <Text style={styles.helperText}>
                    Make it sound as good as it tastes.
                  </Text>
                )}

                <Text style={styles.counter}>
                  {description.length}/500
                </Text>
              </View>
            </View>

            {/* Category */}
            <View style={styles.field}>
              <Text style={styles.label}>Menu category</Text>

              <Text style={styles.helperAbove}>
                Select the course that best describes this dish.
              </Text>

              <View style={styles.courseGrid}>
                {COURSES.map((item, index) => {
                  const active = course === item;
                  const symbols = ['✦', '♨', '❋', '◇'];

                  return (
                    <Pressable
                      key={item}
                      onPress={() => {
                        setCourse(item);
                        setErrors((previous) => ({
                          ...previous,
                          course: '',
                        }));
                      }}
                      style={[
                        styles.courseOption,
                        active && styles.courseOptionActive,
                      ]}
                      accessibilityRole="button"
                      accessibilityState={{ selected: active }}
                    >
                      <Text
                        style={[
                          styles.courseSymbol,
                          active && styles.courseSymbolActive,
                        ]}
                      >
                        {symbols[index]}
                      </Text>

                      <Text
                        style={[
                          styles.courseOptionText,
                          active && styles.courseOptionTextActive,
                        ]}
                      >
                        {item}
                      </Text>

                      <View
                        style={[
                          styles.radioOuter,
                          active && styles.radioOuterActive,
                        ]}
                      >
                        {active && (
                          <View style={styles.radioInner} />
                        )}
                      </View>
                    </Pressable>
                  );
                })}
              </View>

              {errors.course ? (
                <Text style={styles.errorText}>{errors.course}</Text>
              ) : null}
            </View>

            {/* Price */}
            <View style={styles.field}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Selling price</Text>
                <Text style={styles.required}>REQUIRED</Text>
              </View>

              <View
                style={[
                  styles.priceContainer,
                  errors.price ? styles.inputError : null,
                ]}
              >
                <View style={styles.currencyBox}>
                  <Text style={styles.currencyText}>ZAR</Text>
                </View>

                <View style={styles.priceDivider} />

                <TextInput
                  value={price}
                  onChangeText={(value) =>
                    updateField('price', setPrice, value)
                  }
                  placeholder="0.00"
                  placeholderTextColor="#A89D91"
                  keyboardType="decimal-pad"
                  style={styles.priceInput}
                  accessibilityLabel="Dish selling price in rand"
                />

                <Text style={styles.randSymbol}>R</Text>
              </View>

              {errors.price ? (
                <Text style={styles.errorText}>{errors.price}</Text>
              ) : (
                <Text style={styles.helperText}>
                  Enter the price customers will pay in South African rand.
                </Text>
              )}
            </View>

            {/* Availability */}
            <View style={styles.availabilityCard}>
              <View style={styles.availabilityIcon}>
                <Text style={styles.availabilityCheck}>
                  {available ? '✓' : '−'}
                </Text>
              </View>

              <View style={styles.availabilityInfo}>
                <Text style={styles.availabilityTitle}>
                  Menu availability
                </Text>

                <Text style={styles.availabilityDescription}>
                  {available
                    ? 'This dish is currently available to order.'
                    : 'This dish will be marked as unavailable.'}
                </Text>

                <View
                  style={[
                    styles.availabilityStatus,
                    available
                      ? styles.statusAvailable
                      : styles.statusUnavailable,
                  ]}
                >
                  <Text
                    style={[
                      styles.availabilityStatusText,
                      available
                        ? styles.statusAvailableText
                        : styles.statusUnavailableText,
                    ]}
                  >
                    {available ? 'AVAILABLE' : 'UNAVAILABLE'}
                  </Text>
                </View>
              </View>

              <Switch
                value={available}
                onValueChange={setAvailable}
                trackColor={{
                  false: '#D8CFC3',
                  true: '#A4BBA4',
                }}
                thumbColor={available ? C.green : '#F4F0E8'}
                accessibilityLabel="Dish availability"
              />
            </View>

            {/* Buttons */}
            <View style={styles.buttons}>
              <Pressable
                onPress={handleSave}
                style={({ pressed }) => [
                  styles.saveButton,
                  pressed && styles.buttonPressed,
                ]}
                accessibilityRole="button"
              >
                <Text style={styles.saveButtonText}>
                  {isEditing ? 'Save Changes' : 'Save Dish'}
                </Text>

                <Text style={styles.saveButtonArrow}>→</Text>
              </Pressable>

              <Pressable
                onPress={handleCancel}
                style={({ pressed }) => [
                  styles.cancelButton,
                  pressed && styles.buttonPressed,
                ]}
                accessibilityRole="button"
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
            </View>

            {/* Footer */}
            <View style={styles.formFooter}>
              <View style={styles.footerLine} />
              <Text style={styles.footerBrand}>CHRISTOFFEL'S</Text>
              <Text style={styles.footerCaption}>CRAFTED WITH CARE</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: C.cream,
  },
  screen: {
    flex: 1,
    backgroundColor: C.cream,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: C.burgundy,
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 29,
    overflow: 'hidden',
  },
  backButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingRight: 12,
  },
  backArrow: {
    color: C.gold,
    fontSize: 29,
    lineHeight: 30,
    marginRight: 5,
  },
  backText: {
    color: '#F2E7DB',
    fontSize: 12,
    fontWeight: '600',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },
  brandCircle: {
    width: 39,
    height: 39,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: C.gold,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  brandLetter: {
    color: C.gold,
    fontSize: 24,
    fontStyle: 'italic',
  },
  brandName: {
    color: C.white,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.8,
  },
  brandTagline: {
    color: C.gold,
    fontSize: 8,
    letterSpacing: 1.3,
    marginTop: 4,
  },
  headerEyebrow: {
    color: C.gold,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.6,
    marginTop: 27,
  },
  headerTitle: {
    color: C.white,
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.6,
    marginTop: 5,
  },
  headerDescription: {
    color: '#E6D8CB',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 8,
  },
  headerGoldLine: {
    width: 47,
    height: 2,
    backgroundColor: C.gold,
    marginTop: 18,
  },
  headerCircleDecoration: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: 'rgba(212,177,106,0.12)',
    borderRadius: 75,
    right: -75,
    bottom: -80,
  },
  content: {
    paddingHorizontal: 19,
    paddingTop: 25,
  },
  introBlock: {
    marginBottom: 24,
  },
  sectionEyebrow: {
    color: C.muted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  sectionTitle: {
    color: C.text,
    fontSize: 23,
    fontWeight: '700',
    marginTop: 5,
  },
  sectionDescription: {
    color: C.muted,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 8,
  },
  field: {
    marginBottom: 23,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 9,
    gap: 8,
  },
  label: {
    color: C.text,
    fontSize: 13,
    fontWeight: '700',
  },
  required: {
    color: C.burgundyLight,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  input: {
    minHeight: 49,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 10,
    backgroundColor: C.white,
    color: C.text,
    fontSize: 13,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  descriptionInput: {
    minHeight: 116,
    paddingTop: 13,
    lineHeight: 19,
  },
  inputError: {
    borderColor: C.red,
    borderWidth: 1.3,
  },
  helperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 7,
  },
  helperText: {
    color: C.muted,
    fontSize: 10,
    lineHeight: 16,
    marginTop: 7,
    flex: 1,
  },
  helperAbove: {
    color: C.muted,
    fontSize: 10,
    lineHeight: 16,
    marginTop: 5,
    marginBottom: 12,
  },
  counter: {
    color: '#A79B8F',
    fontSize: 9,
    marginTop: 7,
  },
  errorText: {
    color: C.red,
    fontSize: 10,
    lineHeight: 15,
    marginTop: 7,
    flex: 1,
  },
  courseGrid: {
    gap: 9,
  },
  courseOption: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.white,
    borderRadius: 10,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseOptionActive: {
    borderColor: C.gold,
    backgroundColor: '#F5EDDF',
  },
  courseSymbol: {
    color: C.burgundy,
    fontSize: 18,
    width: 31,
  },
  courseSymbolActive: {
    color: C.burgundyLight,
  },
  courseOptionText: {
    flex: 1,
    color: C.text,
    fontSize: 12,
    fontWeight: '600',
  },
  courseOptionTextActive: {
    color: C.burgundy,
    fontWeight: '800',
  },
  radioOuter: {
    width: 17,
    height: 17,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#CFC2B2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterActive: {
    borderColor: C.burgundy,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.burgundy,
  },
  priceContainer: {
    height: 54,
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  currencyBox: {
    paddingHorizontal: 13,
  },
  currencyText: {
    color: C.muted,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.7,
  },
  priceDivider: {
    width: 1,
    height: 25,
    backgroundColor: C.border,
  },
  priceInput: {
    flex: 1,
    height: '100%',
    color: C.text,
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 13,
  },
  randSymbol: {
    color: C.gold,
    fontSize: 18,
    fontWeight: '700',
    paddingRight: 15,
  },
  availabilityCard: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    gap: 11,
  },
  availabilityIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: C.softGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  availabilityCheck: {
    color: C.green,
    fontSize: 20,
    fontWeight: '700',
  },
  availabilityInfo: {
    flex: 1,
  },
  availabilityTitle: {
    color: C.text,
    fontSize: 12,
    fontWeight: '700',
  },
  availabilityDescription: {
    color: C.muted,
    fontSize: 10,
    lineHeight: 15,
    marginTop: 4,
  },
  availabilityStatus: {
    alignSelf: 'flex-start',
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 4,
    marginTop: 7,
  },
  statusAvailable: {
    backgroundColor: C.softGreen,
  },
  statusUnavailable: {
    backgroundColor: '#F8EAEA',
  },
  availabilityStatusText: {
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  statusAvailableText: {
    color: C.green,
  },
  statusUnavailableText: {
    color: C.red,
  },
  buttons: {
    gap: 11,
  },
  saveButton: {
    minHeight: 52,
    backgroundColor: C.burgundy,
    borderRadius: 10,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: C.white,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  saveButtonArrow: {
    color: C.gold,
    fontSize: 20,
    marginLeft: 10,
  },
  buttonPressed: {
    opacity: 0.78,
  },
  cancelButton: {
    minHeight: 47,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: C.burgundy,
    fontSize: 12,
    fontWeight: '700',
  },
  formFooter: {
    alignItems: 'center',
    paddingTop: 29,
    paddingBottom: 12,
  },
  footerLine: {
    width: 38,
    height: 1.5,
    backgroundColor: C.gold,
    marginBottom: 12,
  },
  footerBrand: {
    color: C.burgundy,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
  },
  footerCaption: {
    color: C.muted,
    fontSize: 8,
    letterSpacing: 1.6,
    marginTop: 5,
  },
});
