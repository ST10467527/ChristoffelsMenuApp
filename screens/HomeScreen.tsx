
import React, { useMemo, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import colors from "../constants/colors";
import typography from "../constants/typography";
import type { Dish } from "./AddDishScreen";

type HomeScreenProps = {
  dishes: Dish[];
  onAddDish: () => void;
  onEditDish: (dish: Dish) => void;
  onRemoveDish: (dish: Dish) => void;
  onToggleAvailability: (dish: Dish) => void;
};

const courses = ["All", "Starter", "Main Course", "Dessert", "Beverage"];
const availabilityOptions = ["All", "Available", "Unavailable"];

function formatPrice(price: number) {
  return `R ${price.toFixed(2)}`;
}

export default function HomeScreen({
  dishes,
  onAddDish,
  onEditDish,
  onRemoveDish,
  onToggleAvailability,
}: HomeScreenProps) {
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");

  const availableCount = dishes.filter(
    (dish) => dish.available !== false
  ).length;

  const unavailableCount = dishes.length - availableCount;

  const filteredDishes = useMemo(() => {
    const query = search.trim().toLowerCase();

    return dishes.filter((dish) => {
      const matchesSearch =
        !query ||
        dish.name.toLowerCase().includes(query) ||
        dish.description.toLowerCase().includes(query) ||
        dish.course.toLowerCase().includes(query);

      const matchesCourse =
        selectedCourse === "All" || dish.course === selectedCourse;

      const isAvailable = dish.available !== false;

      const matchesAvailability =
        selectedAvailability === "All" ||
        (selectedAvailability === "Available" && isAvailable) ||
        (selectedAvailability === "Unavailable" && !isAvailable);

      return matchesSearch && matchesCourse && matchesAvailability;
    });
  }, [dishes, search, selectedCourse, selectedAvailability]);

  function resetFilters() {
    setSearch("");
    setSelectedCourse("All");
    setSelectedAvailability("All");
  }

  function confirmRemove(dish: Dish) {
    Alert.alert(
      "Remove Dish",
      `Are you sure you want to remove "${dish.name}" from the menu?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => onRemoveDish(dish),
        },
      ]
    );
  }

  function confirmAvailabilityChange(dish: Dish) {
    const isAvailable = dish.available !== false;
    const nextStatus = isAvailable ? "unavailable" : "available";

    Alert.alert(
      isAvailable ? "Mark as Unavailable?" : "Make Dish Available?",
      `${dish.name} will be marked as ${nextStatus}.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => onToggleAvailability(dish),
        },
      ]
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>CHRISTOFFEL'S</Text>
            <Text style={[typography.screenTitle, styles.title]}>
              Menu Manager
            </Text>
            <Text style={styles.subtitle}>
              Manage your dishes, prices and availability.
            </Text>
          </View>

          <View style={styles.headerMark}>
            <Text style={styles.headerMarkText}>C</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{dishes.length}</Text>
            <Text style={styles.statLabel}>Total Dishes</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={[styles.statNumber, styles.availableNumber]}>
              {availableCount}
            </Text>
            <Text style={styles.statLabel}>Available</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={[styles.statNumber, styles.unavailableNumber]}>
              {unavailableCount}
            </Text>
            <Text style={styles.statLabel}>Unavailable</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={onAddDish}
          activeOpacity={0.85}
        >
          <Text style={styles.addButtonPlus}>＋</Text>
          <Text style={styles.addButtonText}>Add New Dish</Text>
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder="Search dishes, descriptions or courses..."
            placeholderTextColor={colors.muted}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Text style={styles.clearSearch}>×</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterHeading}>COURSE</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >
            {courses.map((item) => {
              const selected = selectedCourse === item;

              return (
                <TouchableOpacity
                  key={item}
                  onPress={() => setSelectedCourse(item)}
                  style={[
                    styles.filterChip,
                    selected && styles.selectedFilterChip,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterText,
                      selected && styles.selectedFilterText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterHeading}>AVAILABILITY</Text>
          <View style={styles.availabilityFilters}>
            {availabilityOptions.map((item) => {
              const selected = selectedAvailability === item;

              return (
                <TouchableOpacity
                  key={item}
                  onPress={() => setSelectedAvailability(item)}
                  style={[
                    styles.availabilityChip,
                    selected && styles.selectedAvailabilityChip,
                    selected && item === "Available" && styles.availableSelected,
                    selected &&
                      item === "Unavailable" &&
                      styles.unavailableSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.availabilityFilterText,
                      selected && styles.selectedAvailabilityFilterText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.menuHeadingRow}>
          <View>
            <Text style={styles.sectionTitle}>Your Menu</Text>
            <Text style={styles.resultCount}>
              {filteredDishes.length}{" "}
              {filteredDishes.length === 1 ? "dish" : "dishes"} found
            </Text>
          </View>

          {(search ||
            selectedCourse !== "All" ||
            selectedAvailability !== "All") && (
            <TouchableOpacity onPress={resetFilters}>
              <Text style={styles.resetText}>Reset filters</Text>
            </TouchableOpacity>
          )}
        </View>

        {filteredDishes.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No dishes found</Text>
            <Text style={styles.emptyDescription}>
              Try another search or change your filters.
            </Text>
            <TouchableOpacity onPress={resetFilters}>
              <Text style={styles.resetText}>Clear all filters</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredDishes.map((dish) => {
            const isAvailable = dish.available !== false;

            return (
              <View key={dish.id} style={styles.dishCard}>
                <View style={styles.dishTopRow}>
                  <View style={styles.dishTitleContainer}>
                    <Text style={styles.dishName}>{dish.name}</Text>
                    <Text style={styles.dishCourse}>{dish.course}</Text>
                  </View>

                  <Text style={styles.dishPrice}>
                    {formatPrice(dish.price)}
                  </Text>
                </View>

                <Text style={styles.dishDescription}>
                  {dish.description}
                </Text>

                <View style={styles.dishStatusRow}>
                  <View
                    style={[
                      styles.statusBadge,
                      isAvailable
                        ? styles.availableBadge
                        : styles.unavailableBadge,
                    ]}
                  >
                    <View
                      style={[
                        styles.statusDot,
                        isAvailable
                          ? styles.availableDot
                          : styles.unavailableDot,
                      ]}
                    />
                    <Text
                      style={[
                        styles.statusText,
                        isAvailable
                          ? styles.availableText
                          : styles.unavailableText,
                      ]}
                    >
                      {isAvailable ? "Available" : "Unavailable"}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => confirmAvailabilityChange(dish)}
                    style={[
                      styles.toggleButton,
                      isAvailable
                        ? styles.markUnavailableButton
                        : styles.markAvailableButton,
                    ]}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.toggleButtonText,
                        !isAvailable && styles.markAvailableText,
                      ]}
                    >
                      {isAvailable
                        ? "Mark Unavailable"
                        : "Make Available"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.cardDivider} />

                <View style={styles.actionsRow}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => onEditDish(dish)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.editButtonText}>Edit Dish</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => confirmRemove(dish)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}

        <Text style={styles.footer}>
          CHRISTOFFEL'S MENU MANAGEMENT
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  content: {
    padding: 20,
    paddingBottom: 35,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
    marginBottom: 22,
  },
  eyebrow: {
    fontSize: 11,
    color: colors.gold,
    fontWeight: "700",
    letterSpacing: 2.2,
    marginBottom: 6,
  },
  title: {
    color: colors.burgundy,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.muted,
    maxWidth: 260,
  },
  headerMark: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.burgundy,
    borderWidth: 2,
    borderColor: colors.gold,
    alignItems: "center",
    justifyContent: "center",
  },
  headerMarkText: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.gold,
  },
  statsRow: {
    flexDirection: "row",
    gap: 9,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statNumber: {
    color: colors.burgundy,
    fontSize: 23,
    fontWeight: "700",
    marginBottom: 4,
  },
  availableNumber: {
    color: colors.success,
  },
  unavailableNumber: {
    color: colors.error,
  },
  statLabel: {
    fontSize: 11,
    color: colors.muted,
  },
  addButton: {
    minHeight: 52,
    borderRadius: 12,
    backgroundColor: colors.burgundy,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 17,
  },
  addButtonPlus: {
    color: colors.gold,
    fontSize: 22,
    fontWeight: "500",
  },
  addButtonText: {
    ...typography.button,
    color: colors.white,
  },
  searchContainer: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 13,
    marginBottom: 20,
  },
  searchIcon: {
    color: colors.burgundy,
    fontSize: 25,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: colors.black,
    fontSize: 13,
    paddingVertical: 12,
  },
  clearSearch: {
    color: colors.muted,
    fontSize: 24,
    paddingLeft: 8,
  },
  filterSection: {
    marginBottom: 18,
  },
  filterHeading: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.4,
    marginBottom: 10,
  },
  filterRow: {
    gap: 8,
    paddingRight: 5,
  },
  filterChip: {
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  selectedFilterChip: {
    backgroundColor: colors.burgundy,
    borderColor: colors.burgundy,
  },
  filterText: {
    color: colors.black,
    fontSize: 12,
    fontWeight: "500",
  },
  selectedFilterText: {
    color: colors.white,
  },
  availabilityFilters: {
    flexDirection: "row",
    gap: 8,
  },
  availabilityChip: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  selectedAvailabilityChip: {
    backgroundColor: colors.burgundy,
    borderColor: colors.burgundy,
  },
  availableSelected: {
    backgroundColor: "#287D46",
    borderColor: "#287D46",
  },
  unavailableSelected: {
    backgroundColor: colors.error,
    borderColor: colors.error,
  },
  availabilityFilterText: {
    color: colors.black,
    fontSize: 12,
    fontWeight: "600",
  },
  selectedAvailabilityFilterText: {
    color: colors.white,
  },
  menuHeadingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 14,
  },
  sectionTitle: {
    ...typography.sectionTitle,
    color: colors.burgundy,
  },
  resultCount: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 3,
  },
  resetText: {
    color: colors.burgundy,
    fontSize: 12,
    fontWeight: "700",
  },
  dishCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 15,
    padding: 16,
    marginBottom: 13,
  },
  dishTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  dishTitleContainer: {
    flex: 1,
  },
  dishName: {
    color: colors.burgundy,
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 23,
  },
  dishCourse: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: "700",
    marginTop: 5,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  dishPrice: {
    ...typography.price,
    color: colors.burgundy,
  },
  dishDescription: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 12,
    marginBottom: 15,
  },
  dishStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 9,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 7,
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
  toggleButton: {
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 11,
    borderWidth: 1,
  },
  markUnavailableButton: {
    borderColor: colors.border,
    backgroundColor: colors.cream,
  },
  markAvailableButton: {
    borderColor: "#B8DCC0",
    backgroundColor: "#E8F4E9",
  },
  toggleButtonText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.burgundy,
  },
  markAvailableText: {
    color: colors.success,
  },
  cardDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginTop: 15,
    marginBottom: 13,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
  },
  editButton: {
    flex: 1,
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
    backgroundColor: colors.burgundy,
  },
  editButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "700",
  },
  removeButton: {
    minHeight: 40,
    minWidth: 85,
    paddingHorizontal: 13,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#E7B7B3",
    backgroundColor: colors.white,
  },
  removeButtonText: {
    color: colors.error,
    fontSize: 12,
    fontWeight: "700",
  },
  emptyState: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
  },
  emptyTitle: {
    color: colors.burgundy,
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 8,
  },
  emptyDescription: {
    color: colors.muted,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 15,
  },
  footer: {
    textAlign: "center",
    color: colors.muted,
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 1.5,
    marginTop: 16,
  },
});
