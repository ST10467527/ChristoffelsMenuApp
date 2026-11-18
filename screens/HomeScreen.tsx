
import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
} from 'react-native';

import type { Dish } from './AddDishScreen';

type HomeScreenProps = {
  dishes: Dish[];
  onAddDish: () => void;
  onEditDish: (dish: Dish) => void;
};

const COLORS = {
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
  softRed: '#F8EAEA',
};

const COURSES = ['All', 'Starter', 'Main Course', 'Dessert', 'Beverage'];

export default function HomeScreen({
  dishes,
  onAddDish,
  onEditDish,
}: HomeScreenProps) {
  const [search, setSearch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');

  const totalDishes = dishes.length;
  const availableDishes = dishes.filter((dish) => dish.available).length;
  const unavailableDishes = totalDishes - availableDishes;

  const filteredDishes = useMemo(() => {
    const query = search.trim().toLowerCase();

    return dishes.filter((dish) => {
      const matchesSearch =
        !query ||
        dish.name.toLowerCase().includes(query) ||
        dish.description.toLowerCase().includes(query) ||
        dish.course.toLowerCase().includes(query);

      const matchesCourse =
        selectedCourse === 'All' || dish.course === selectedCourse;

      const matchesAvailability =
        availabilityFilter === 'All' ||
        (availabilityFilter === 'Available' && dish.available) ||
        (availabilityFilter === 'Unavailable' && !dish.available);

      return matchesSearch && matchesCourse && matchesAvailability;
    });
  }, [dishes, search, selectedCourse, availabilityFilter]);

  const formatPrice = (price: number) =>
    `R ${price.toLocaleString('en-ZA', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const clearFilters = () => {
    setSearch('');
    setSelectedCourse('All');
    setAvailabilityFilter('All');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.burgundy}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Restaurant header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brandName}>CHRISTOFFEL’S</Text>
            <Text style={styles.brandSubtitle}>RESTAURANT MENU</Text>
          </View>

          <View style={styles.brandMark}>
            <Text style={styles.brandMarkText}>C</Text>
          </View>
        </View>

        {/* Page heading */}
        <View style={styles.headingSection}>
          <Text style={styles.screenTitle}>Menu Dashboard</Text>
          <Text style={styles.screenSubtitle}>
            Manage your restaurant menu in one place.
          </Text>
        </View>

        {/* Add dish button */}
        <Pressable
          style={styles.addButton}
          onPress={onAddDish}
        >
          <Text style={styles.addButtonText}>+ Add New Dish</Text>
        </Pressable>

        {/* Menu overview */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Menu Overview</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{totalDishes}</Text>
            <Text style={styles.statLabel}>Total Dishes</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: COLORS.green }]}>
              {availableDishes}
            </Text>
            <Text style={styles.statLabel}>Available</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: COLORS.red }]}>
              {unavailableDishes}
            </Text>
            <Text style={styles.statLabel}>Unavailable</Text>
          </View>
        </View>

        {/* Your dishes */}
        <View style={styles.dishesHeading}>
          <Text style={styles.sectionTitle}>Your Dishes</Text>
          <Text style={styles.dishCount}>{totalDishes} dishes</Text>
        </View>

        {/* Search */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search dishes..."
          placeholderTextColor={COLORS.muted}
          value={search}
          onChangeText={setSearch}
        />

        {/* Course filters */}
        <Text style={styles.filterLabel}>FILTER BY COURSE</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          {COURSES.map((course) => (
            <Pressable
              key={course}
              style={[
                styles.filterButton,
                selectedCourse === course && styles.activeFilterButton,
              ]}
              onPress={() => setSelectedCourse(course)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedCourse === course &&
                    styles.activeFilterButtonText,
                ]}
              >
                {course}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Availability filters */}
        <Text style={styles.filterLabel}>AVAILABILITY</Text>

        <View style={styles.availabilityFilters}>
          {['All', 'Available', 'Unavailable'].map((filter) => (
            <Pressable
              key={filter}
              style={[
                styles.availabilityButton,
                availabilityFilter === filter &&
                  styles.activeAvailabilityButton,
              ]}
              onPress={() => setAvailabilityFilter(filter)}
            >
              <Text
                style={[
                  styles.availabilityButtonText,
                  availabilityFilter === filter &&
                    styles.activeAvailabilityButtonText,
                ]}
              >
                {filter}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Dish list */}
        {dishes.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Your menu is waiting</Text>
            <Text style={styles.emptyDescription}>
              Start building your restaurant menu by adding your first dish.
            </Text>

            <Pressable
              style={styles.emptyButton}
              onPress={onAddDish}
            >
              <Text style={styles.emptyButtonText}>Add Your First Dish</Text>
            </Pressable>
          </View>
        ) : filteredDishes.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No dishes found</Text>
            <Text style={styles.emptyDescription}>
              Try changing your search or filters.
            </Text>

            <Pressable
              style={styles.clearButton}
              onPress={clearFilters}
            >
              <Text style={styles.clearButtonText}>Clear Filters</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.dishList}>
            {filteredDishes.map((dish) => (
              <View key={dish.id} style={styles.dishCard}>
                <View style={styles.dishInformation}>
                  <Text style={styles.dishName}>{dish.name}</Text>

                  <Text style={styles.dishDescription}>
                    {dish.description}
                  </Text>

                  <Text style={styles.dishCourse}>{dish.course}</Text>

                  <Text style={styles.dishPrice}>
                    {formatPrice(dish.price)}
                  </Text>

                  <View
                    style={[
                      styles.statusBadge,
                      dish.available
                        ? styles.availableBadge
                        : styles.unavailableBadge,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        dish.available
                          ? styles.availableText
                          : styles.unavailableText,
                      ]}
                    >
                      {dish.available ? 'Available' : 'Unavailable'}
                    </Text>
                  </View>
                </View>

                <Pressable
                  style={styles.editButton}
                  onPress={() => onEditDish(dish)}
                >
                  <Text style={styles.editButtonText}>Edit</Text>
                </Pressable>
              </View>
            ))}
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            CHRISTOFFEL’S · EST. 2026
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  scrollContent: {
    paddingBottom: 35,
  },
  header: {
    backgroundColor: COLORS.burgundy,
    paddingHorizontal: 24,
    paddingVertical: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandName: {
    color: COLORS.white,
    fontSize: 21,
    fontWeight: '800',
    letterSpacing: 2,
  },
  brandSubtitle: {
    color: COLORS.gold,
    fontSize: 10,
    letterSpacing: 3,
    marginTop: 5,
  },
  brandMark: {
    width: 45,
    height: 45,
    borderRadius: 23,
    borderWidth: 1.5,
    borderColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandMarkText: {
    color: COLORS.gold,
    fontSize: 25,
    fontWeight: '600',
  },
  headingSection: {
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 18,
  },
  screenTitle: {
    color: COLORS.text,
    fontSize: 27,
    fontWeight: '700',
  },
  screenSubtitle: {
    color: COLORS.muted,
    fontSize: 14,
    marginTop: 7,
  },
  addButton: {
    backgroundColor: COLORS.burgundy,
    marginHorizontal: 22,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
  sectionHeader: {
    marginHorizontal: 22,
    marginTop: 30,
    marginBottom: 14,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 19,
    fontWeight: '700',
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 22,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statNumber: {
    fontSize: 23,
    fontWeight: '800',
    color: COLORS.burgundy,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 6,
    textAlign: 'center',
  },
  dishesHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 22,
    marginTop: 32,
    marginBottom: 15,
  },
  dishCount: {
    color: COLORS.muted,
    fontSize: 12,
  },
  searchInput: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 9,
    paddingHorizontal: 15,
    paddingVertical: 13,
    marginHorizontal: 22,
    fontSize: 14,
    color: COLORS.text,
  },
  filterLabel: {
    marginHorizontal: 22,
    marginTop: 20,
    marginBottom: 10,
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  filterContainer: {
    paddingHorizontal: 22,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  activeFilterButton: {
    backgroundColor: COLORS.burgundy,
    borderColor: COLORS.burgundy,
  },
  filterButtonText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '600',
  },
  activeFilterButtonText: {
    color: COLORS.white,
  },
  availabilityFilters: {
    flexDirection: 'row',
    marginHorizontal: 22,
    gap: 8,
  },
  availabilityButton: {
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeAvailabilityButton: {
    backgroundColor: COLORS.burgundy,
    borderColor: COLORS.burgundy,
  },
  availabilityButtonText: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: '600',
  },
  activeAvailabilityButtonText: {
    color: COLORS.white,
  },
  dishList: {
    marginHorizontal: 22,
    marginTop: 18,
    gap: 12,
  },
  dishCard: {
    backgroundColor: COLORS.white,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dishInformation: {
    flex: 1,
    paddingRight: 12,
  },
  dishName: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
  },
  dishDescription: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },
  dishCourse: {
    color: COLORS.burgundyLight,
    fontSize: 11,
    fontWeight: '600',
    marginTop: 8,
  },
  dishPrice: {
    color: COLORS.burgundy,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 7,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 8,
  },
  availableBadge: {
    backgroundColor: COLORS.softGreen,
  },
  unavailableBadge: {
    backgroundColor: COLORS.softRed,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  availableText: {
    color: COLORS.green,
  },
  unavailableText: {
    color: COLORS.red,
  },
  editButton: {
    backgroundColor: COLORS.cream,
    borderWidth: 1,
    borderColor: COLORS.gold,
    paddingHorizontal: 17,
    paddingVertical: 9,
    borderRadius: 8,
  },
  editButtonText: {
    color: COLORS.burgundy,
    fontSize: 12,
    fontWeight: '700',
  },
  emptyState: {
    marginHorizontal: 22,
    marginTop: 25,
    padding: 25,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  emptyTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: '700',
  },
  emptyDescription: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 8,
  },
  emptyButton: {
    backgroundColor: COLORS.burgundy,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 18,
  },
  emptyButtonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  clearButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gold,
    marginTop: 15,
  },
  clearButtonText: {
    color: COLORS.burgundy,
    fontSize: 12,
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    marginTop: 35,
    paddingVertical: 15,
  },
  footerText: {
    color: COLORS.muted,
    fontSize: 10,
    letterSpacing: 2,
  },
});
