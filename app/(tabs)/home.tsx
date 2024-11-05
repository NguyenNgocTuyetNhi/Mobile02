import { MaterialIcons } from "@expo/vector-icons";
import Icon from "@react-native-vector-icons/fontawesome";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import Slider from "../screens/slider";
import ProductList from "../screens/product";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  // Dữ liệu cứng cho sản phẩm
  
  const categories = [
    { id: "1", name: "All" },
    { id: "2", name: "Size M" },
    { id: "3", name: "Size L" },
  ];
  return (
    <View style={styles.container}>
      {/* Logo và Ô tìm kiếm */}
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/2.png")}
          style={styles.logo}
        />
        <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="green" />

          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#aaa"
          />

        </View>
       
        <TouchableOpacity style={styles.categoryButton}>
          <MaterialIcons name ="message" size={24} color="green" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryButton}>
          <MaterialIcons name="shopping-cart" size={24} color="green" />
        </TouchableOpacity>
      </View>
        <Slider/>
      {/* Banner */}
     
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryButton}>
              <Text style={styles.categoryText}>{category.name} </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {/* Danh sách sản phẩm */}
     <ProductList/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    alignItems: "center",
    justifyContent: "space-between", // Giãn cách giữa logo và các nút
    marginBottom: 12,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 10, // Thêm khoảng cách dưới logo
  },
  cartButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginLeft: 10,
    borderColor: "green",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryButton: {
    paddingVertical: 6, // Điều chỉnh padding của nút
    paddingHorizontal: 12,
    borderRadius: 12,
    marginLeft: 10, // Khoảng cách giữa các nút
    backgroundColor: "#fff",
    borderColor: "green", // Thêm viền cho nút
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    fontSize: 16,
    color: "#333",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    flex: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    height: 50,
    width: "20%", // Điều chỉnh chiều rộng của ô tìm kiếm
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },
  bannerContainer: {
    marginBottom: 12,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  banner: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 8,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  productContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  productImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  productDetails: {
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "green",
  },
  productPrice: {
    fontSize: 14,
    marginBottom: 8,
    color: "#333",
  },
  buyButton: {
    height: 30,
    backgroundColor: "green",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buyButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  emptyMessage: {
    fontSize: 18,
    textAlign: "center",
    color: "#333",
  },
});
