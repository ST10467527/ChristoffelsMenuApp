
import React, { useState } from 'react';
import { Alert, StatusBar } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import AddDishScreen, { Dish } from './screens/AddDishScreen';
import colors from './constants/colors';

type Screen = 'home' | 'addDish' | 'editDish';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const [dishes, setDishes] = useState<Dish[]>([
    // STARTERS
    {
      id: 'dish-01',
      name: 'Crispy Chicken Wings',
      description: 'Golden chicken wings served with a delicious dipping sauce.',
      course: 'Starter',
      price: 85,
      available: true,
    },
    {
      id: 'dish-02',
      name: 'Crispy Calamari',
      description: 'Lightly battered calamari served with lemon and tartar sauce.',
      course: 'Starter',
      price: 110,
      available: true,
    },
    {
      id: 'dish-03',
      name: 'Mozzarella Sticks',
      description: 'Crispy mozzarella sticks served with a tomato dipping sauce.',
      course: 'Starter',
      price: 75,
      available: true,
    },
    {
      id: 'dish-04',
      name: 'Tomato Bruschetta',
      description: 'Toasted bread topped with fresh tomatoes, basil and olive oil.',
      course: 'Starter',
      price: 65,
      available: true,
    },
    {
      id: 'dish-05',
      name: 'Creamy Garlic Mushrooms',
      description: 'Fresh mushrooms cooked in a creamy garlic sauce.',
      course: 'Starter',
      price: 80,
      available: true,
    },
    {
      id: 'dish-06',
      name: 'Loaded Potato Skins',
      description: 'Crispy potato skins topped with cheese and bacon.',
      course: 'Starter',
      price: 75,
      available: true,
    },
    {
      id: 'dish-07',
      name: 'Peri-Peri Chicken Livers',
      description: 'Chicken livers prepared in a rich peri-peri sauce.',
      course: 'Starter',
      price: 85,
      available: true,
    },

    // MAIN COURSES
    {
      id: 'dish-08',
      name: 'Creamy Chicken Alfredo',
      description: 'Chicken and fettuccine pasta in a creamy Alfredo sauce.',
      course: 'Main Course',
      price: 145,
      available: true,
    },
    {
      id: 'dish-09',
      name: 'Classic Beef Burger',
      description: 'Beef patty served with lettuce, tomato and house sauce.',
      course: 'Main Course',
      price: 120,
      available: true,
    },
    {
      id: 'dish-10',
      name: 'Grilled Rib-Eye Steak',
      description: 'Grilled rib-eye steak served with your choice of sides.',
      course: 'Main Course',
      price: 225,
      available: true,
    },
    {
      id: 'dish-11',
      name: 'Grilled Chicken Breast',
      description: 'Seasoned grilled chicken breast served with vegetables.',
      course: 'Main Course',
      price: 155,
      available: true,
    },
    {
      id: 'dish-12',
      name: 'Lamb Chops',
      description: 'Tender grilled lamb chops served with a side of your choice.',
      course: 'Main Course',
      price: 210,
      available: true,
    },
    {
      id: 'dish-13',
      name: 'Beef Lasagne',
      description: 'Traditional beef lasagne layered with pasta, cheese and sauce.',
      course: 'Main Course',
      price: 150,
      available: true,
    },
    {
      id: 'dish-14',
      name: 'Fish and Chips',
      description: 'Golden battered fish served with crispy chips.',
      course: 'Main Course',
      price: 165,
      available: true,
    },
    {
      id: 'dish-15',
      name: 'Chicken and Mushroom Pasta',
      description: 'Chicken and mushrooms tossed in a creamy pasta sauce.',
      course: 'Main Course',
      price: 150,
      available: true,
    },
    {
      id: 'dish-16',
      name: 'BBQ Pork Ribs',
      description: 'Slow-cooked pork ribs coated in a smoky BBQ sauce.',
      course: 'Main Course',
      price: 195,
      available: true,
    },

    // DESSERTS
    {
      id: 'dish-17',
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with a soft, melted chocolate centre.',
      course: 'Dessert',
      price: 65,
      available: true,
    },
    {
      id: 'dish-18',
      name: 'New York Cheesecake',
      description: 'Creamy baked cheesecake served with a berry topping.',
      course: 'Dessert',
      price: 70,
      available: true,
    },
    {
      id: 'dish-19',
      name: 'Traditional Malva Pudding',
      description: 'Traditional South African malva pudding served with custard.',
      course: 'Dessert',
      price: 60,
      available: true,
    },
    {
      id: 'dish-20',
      name: 'Chocolate Brownie',
      description: 'Rich chocolate brownie served with a scoop of ice cream.',
      course: 'Dessert',
      price: 55,
      available: true,
    },
    {
      id: 'dish-21',
      name: 'Classic Crème Brûlée',
      description: 'Vanilla custard topped with a crisp caramelised sugar layer.',
      course: 'Dessert',
      price: 75,
      available: true,
    },
    {
      id: 'dish-22',
      name: 'Ice Cream Sundae',
      description: 'Ice cream topped with chocolate sauce and sprinkles.',
      course: 'Dessert',
      price: 45,
      available: true,
    },

    // BEVERAGES
    {
      id: 'dish-23',
      name: 'Fresh Lemonade',
      description: 'Refreshing homemade lemonade.',
      course: 'Beverage',
      price: 35,
      available: true,
    },
    {
      id: 'dish-24',
      name: 'Coca-Cola',
      description: 'Chilled Coca-Cola.',
      course: 'Beverage',
      price: 30,
      available: true,
    },
    {
      id: 'dish-25',
      name: 'Still Water',
      description: 'Bottled still drinking water.',
      course: 'Beverage',
      price: 25,
      available: true,
    },
    {
      id: 'dish-26',
      name: 'Sparkling Water',
      description: 'Chilled sparkling water.',
      course: 'Beverage',
      price: 30,
      available: true,
    },
    {
      id: 'dish-27',
      name: 'Peach Iced Tea',
      description: 'Refreshing iced tea with a peach flavour.',
      course: 'Beverage',
      price: 35,
      available: true,
    },
    {
      id: 'dish-28',
      name: 'Fresh Orange Juice',
      description: 'Freshly prepared orange juice.',
      course: 'Beverage',
      price: 40,
      available: true,
    },
    {
      id: 'dish-29',
      name: 'Strawberry Milkshake',
      description: 'Creamy strawberry milkshake.',
      course: 'Beverage',
      price: 55,
      available: true,
    },
    {
      id: 'dish-30',
      name: 'Virgin Mojito',
      description: 'Refreshing mint and lime mocktail.',
      course: 'Beverage',
      price: 50,
      available: true,
    },
  ]);

  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  // Open the Add Dish screen
  const handleAddDish = () => {
    setSelectedDish(null);
    setCurrentScreen('addDish');
  };

  // Open the Edit Dish screen
  const handleEditDish = (dish: Dish) => {
    setSelectedDish(dish);
    setCurrentScreen('editDish');
  };

  // Save a new dish or update an existing dish
  const handleSaveDish = (savedDish: Dish) => {
    if (currentScreen === 'editDish') {
      setDishes((previousDishes) =>
        previousDishes.map((dish) =>
          dish.id === savedDish.id ? savedDish : dish
        )
      );

      setSelectedDish(null);
      setCurrentScreen('home');

      Alert.alert(
        'Changes saved',
        `${savedDish.name} has been updated successfully.`
      );

      return;
    }

    setDishes((previousDishes) => [...previousDishes, savedDish]);

    setSelectedDish(null);
    setCurrentScreen('home');

    Alert.alert(
      'Dish added successfully',
      `${savedDish.name} has been added to your menu.`
    );
  };

  // Cancel and return to the Home screen
  const handleCancel = () => {
    setSelectedDish(null);
    setCurrentScreen('home');
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.cream}
      />

      {currentScreen === 'home' ? (
        <HomeScreen
          dishes={dishes}
          onAddDish={handleAddDish}
          onEditDish={handleEditDish}
        />
      ) : (
        <AddDishScreen
          onSave={handleSaveDish}
          onCancel={handleCancel}
          dishToEdit={
            currentScreen === 'editDish' ? selectedDish : null
          }
        />
      )}
    </>
  );
}
