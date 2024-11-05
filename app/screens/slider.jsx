import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Text,
} from "react-native";
import Swiper from "react-native-swiper";
import { fetchBanners } from "../api/banners"; 

const { width: windowWidth } = Dimensions.get("window");

const Slider = () => {
  const [banners, setBanners] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        const banners = await fetchBanners();
        console.log(banners); 
        if (banners) {
          setBanners(banners); 
        } else {
          console.error("Banners data is not an array");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadBanners();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#FF4081" />;
  }

  return (
    <View style={styles.sliderContainer}>                      
      <Swiper autoplay loop showsPagination>
        {banners && banners.length > 0 ? (
          banners.map((banner) => (
            <Image
             key={banner.id}
              source={{
                uri: `http://localhost/mobile-backend/public/images/banners/${banner.image}`,
              }}
              style={styles.IMGslider}
            ></Image>
           
          ))
        ) : (
          <View>
            <Text>No banners available</Text>
          </View>
        )}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
  },
  IMGslider: {
    height: "100%",
    width: "100%",
  },
  
});

export default Slider;