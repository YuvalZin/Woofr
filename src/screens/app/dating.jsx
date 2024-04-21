import React from 'react';
import { View, Text, Image, Dimensions,StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon } from "react-native-heroicons/outline";
import LogoImage from '../../../assets/media/user1.jpg';
import Carousal from "react-native-snap-carousel";
import { datesData } from '../../utils/data/dateData';
import DatesCard from '../../utils/ui/DatesCard';


const { width, height } = Dimensions.get("window");



const Dating = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.profileImageContainer}>
                    <Image
                        source={LogoImage}
                        style={styles.profileImage}
                    />
                </View>
                <Text style={styles.title}>woofr</Text>
            </View>
            <View style={styles.bellContainer}>
                <TouchableOpacity>
                    <BellIcon size={25} strokeWidth={2} color="black" />
                </TouchableOpacity>
            </View>
            <View className=" pb-4">
                <View className="mx-4 mb-4">
                    <Text className="capitalize text-2xl font-semibold">
                        Find your love
                    </Text>
                </View>

                <View className="">
                    <Carousal
                        data={datesData}
                        renderItem={({ item }) => <DatesCard item={item} />}
                        firstItem={1}
                        inactiveSlideScale={0.86}
                        inactiveSlideOpacity={0.6}
                        sliderWidth={width}
                        itemWidth={width * 0.8}
                        slideStyle={{ display: "flex", alignItems: "center" }}
                    />
                </View>
            </View>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        paddingTop: hp(2), // Adjust the top padding as needed
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    profileImageContainer: {
        borderRadius: hp(4.5) / 2, // Adjust based on your image size
        overflow: 'hidden',
    },
    profileImage: {
        width: hp(4.5),
        height: hp(4.5),
        resizeMode: 'cover',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    bellContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        padding: 20,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Dating;
