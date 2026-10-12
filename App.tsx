
import React, { useState } from "react";
import { Alert, StatusBar } from "react-native";

import HomeScreen from "./screens/HomeScreen";
import AddDishScreen, { type Dish } from "./screens/AddDishScreen";
import colors from "./constants/colors";

type Screen = "home" | "addDish" | "editDish";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");


const [dishes, setDishes] = useState<Dish[]>([
  // STARTERS
  {
    id: "dish-01",
    name: "Crispy Chicken Wings",
    description: "Golden chicken wings tossed in a smoky BBQ or spicy peri-peri sauce.",
    course: "Starter",
    price: 85,
    available: true,
  },
  {
    id: "dish-02",
    name: "Crispy Calamari",
    description: "Lightly battered calamari served with lemon and garlic aioli.",
    course: "Starter",
    price: 110,
    available: true,
  },
  {
    id: "dish-03",
    name: "Mozzarella Sticks",
    description: "Crispy crumbed mozzarella with a rich tomato dipping sauce.",
    course: "Starter",
    price: 75,
    available: true,
  },
  {
    id: "dish-04",
    name: "Tomato Bruschetta",
    description: "Toasted bread topped with fresh tomato, basil and olive oil.",
    course: "Starter",
    price: 65,
    available: true,
  },
  {
    id: "dish-05",
    name: "Creamy Garlic Mushrooms",
    description: "Sautéed mushrooms in a creamy garlic sauce served with toasted bread.",
    course: "Starter",
    price: 80,
    available: true,
  },
  {
    id: "dish-06",
    name: "Loaded Potato Skins",
    description: "Crispy potato skins topped with melted cheese and spring onions.",
    course: "Starter",
    price: 75,
    available: true,
  },
  {
    id: "dish-07",
    name: "Peri-Peri Chicken Livers",
    description: "Tender chicken livers in a spicy peri-peri sauce with toasted bread.",
    course: "Starter",
    price: 85,
    available: true,
  },

  // MAIN COURSES
  {
    id: "dish-08",
    name: "Creamy Chicken Alfredo",
    description: "Grilled chicken and fettuccine tossed in a creamy Parmesan sauce.",
    course: "Main Course",
    price: 145,
    available: true,
  },
  {
    id: "dish-09",
    name: "Classic Beef Burger",
    description: "Juicy beef patty with lettuce, tomato, cheese and house sauce, served with chips.",
    course: "Main Course",
    price: 120,
    available: true,
  },
  {
    id: "dish-10",
    name: "Grilled Rib-Eye Steak",
    description: "Grilled rib-eye steak served with chips and seasonal vegetables.",
    course: "Main Course",
    price: 225,
    available: true,
  },
  {
    id: "dish-11",
    name: "Grilled Chicken Breast",
    description: "Seasoned grilled chicken breast with creamy mashed potatoes and vegetables.",
    course: "Main Course",
    price: 155,
    available: true,
  },
  {
    id: "dish-12",
    name: "Lamb Chops",
    description: "Grilled lamb chops served with rosemary potatoes and vegetables.",
    course: "Main Course",
    price: 210,
    available: true,
  },
  {
    id: "dish-13",
    name: "Beef Lasagne",
    description: "Layers of pasta, savoury beef mince, tomato sauce and melted cheese.",
    course: "Main Course",
    price: 150,
    available: true,
  },
  {
    id: "dish-14",
    name: "Fish and Chips",
    description: "Golden battered fish served with crispy chips, lemon and tartare sauce.",
    course: "Main Course",
    price: 165,
    available: true,
  },
  {
    id: "dish-15",
    name: "Chicken and Mushroom Pasta",
    description: "Chicken, mushrooms and penne pasta in a creamy garlic sauce.",
    course: "Main Course",
    price: 150,
    available: true,
  },
  {
    id: "dish-16",
    name: "BBQ Pork Ribs",
    description: "Slow-cooked pork ribs coated in smoky BBQ sauce with chips.",
    course: "Main Course",
    price: 195,
    available: true,
  },

  // DESSERTS
  {
    id: "dish-17",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a rich molten centre, served with ice cream.",
    course: "Dessert",
    price: 65,
    available: true,
  },
  {
    id: "dish-18",
    name: "New York Cheesecake",
    description: "Creamy baked cheesecake with a buttery biscuit base.",
    course: "Dessert",
    price: 70,
    available: true,
  },
  {
    id: "dish-19",
    name: "Traditional Malva Pudding",
    description: "Warm South African malva pudding served with custard.",
    course: "Dessert",
    price: 60,
    available: true,
  },
  {
    id: "dish-20",
    name: "Chocolate Brownie",
    description: "Rich chocolate brownie served warm with vanilla ice cream.",
    course: "Dessert",
    price: 55,
    available: true,
  },
  {
    id: "dish-21",
    name: "Classic Crème Brûlée",
    description: "Silky vanilla custard topped with a crisp caramelised sugar layer.",
    course: "Dessert",
    price: 75,
    available: true,
  },
  {
    id: "dish-22",
    name: "Ice Cream Sundae",
    description: "Vanilla ice cream topped with chocolate sauce and crunchy sprinkles.",
    course: "Dessert",
    price: 45,
    available: true,
  },

  // BEVERAGES
  {
    id: "dish-23",
    name: "Fresh Lemonade",
    description: "Refreshing homemade lemonade with freshly squeezed lemons.",
    course: "Beverage",
    price: 35,
    available: true,
  },
  {
    id: "dish-24",
    name: "Coca-Cola",
    description: "Chilled Coca-Cola served over ice.",
    course: "Beverage",
    price: 30,
    available: true,
  },
  {
    id: "dish-25",
    name: "Still Water",
    description: "Bottled still drinking water.",
    course: "Beverage",
    price: 25,
    available: true,
  },
  {
    id: "dish-26",
    name: "Sparkling Water",
    description: "Chilled sparkling mineral water.",
    course: "Beverage",
    price: 30,
    available: true,
  },
  {
    id: "dish-27",
    name: "Peach Iced Tea",
    description: "Chilled peach iced tea served over ice.",
    course: "Beverage",
    price: 35,
    available: true,
  },
  {
    id: "dish-28",
    name: "Fresh Orange Juice",
    description: "Refreshing orange juice with a bright citrus flavour.",
    course: "Beverage",
    price: 40,
    available: true,
  },
  {
    id: "dish-29",
    name: "Strawberry Milkshake",
    description: "Creamy strawberry milkshake blended until smooth.",
    course: "Beverage",
    price: 55,
    available: true,
  },
  {
    id: "dish-30",
    name: "Virgin Mojito",
    description: "A refreshing non-alcoholic mix of mint, lime, soda and ice.",
    course: "Beverage",
    price: 50,
    available: true,
  },
]);


  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  function handleAddDish() {
    setSelectedDish(null);
    setCurrentScreen("addDish");
  }

  function handleEditDish(dish: Dish) {
    setSelectedDish(dish);
    setCurrentScreen("editDish");
  }

  function handleSaveDish(savedDish: Dish) {
    if (currentScreen === "editDish") {
      setDishes((currentDishes) =>
        currentDishes.map((dish) =>
          dish.id === savedDish.id ? savedDish : dish
        )
      );

      Alert.alert(
        "Changes Saved",
        `${savedDish.name} has been updated successfully.`
      );
    } else {
      setDishes((currentDishes) => [...currentDishes, savedDish]);

      Alert.alert(
        "Dish Added Successfully",
        `${savedDish.name} has been added to your menu.`
      );
    }

    setSelectedDish(null);
    setCurrentScreen("home");
  }

  function handleRemoveDish(dish: Dish) {
    setDishes((currentDishes) =>
      currentDishes.filter((item) => item.id !== dish.id)
    );

    Alert.alert(
      "Dish Removed",
      `${dish.name} has been removed from your menu.`
    );
  }

  function handleToggleAvailability(dish: Dish) {
    setDishes((currentDishes) =>
      currentDishes.map((item) =>
        item.id === dish.id
          ? { ...item, available: item.available === false }
          : item
      )
    );
  }

  function handleCancel() {
    setSelectedDish(null);
    setCurrentScreen("home");
  }

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.cream}
      />

      {currentScreen === "home" ? (
        <HomeScreen
          dishes={dishes}
          onAddDish={handleAddDish}
          onEditDish={handleEditDish}
          onRemoveDish={handleRemoveDish}
          onToggleAvailability={handleToggleAvailability}
        />
      ) : (
        <AddDishScreen
          onSave={handleSaveDish}
          onCancel={handleCancel}
          dishToEdit={
            currentScreen === "editDish" ? selectedDish : null
          }
        />
      )}
    </>
  );
}

