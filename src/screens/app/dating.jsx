import { View, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView, View } from "react-native-safe-area-context";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import LogoImage from "../../../assets/logo-wofer2.png";

const Dating = () => {

    return (
        <SafeAreaView className="bg-white flex-1 justify-between">
            <View className="w-full flex-row justify-between items-center px-4 mb-8">
                <View className="rounded-full items-center justify-center">
                    <Image
                        source={LogoImage}
                        style={{
                            width: hp(4.5),
                            height: hp(4.5),
                            resizeMode: "cover",
                        }}
                        className="rounded-full"
                    />
                </View>

                <View>
                    <Text className="text-xl font-semibold text-center uppercase">
                        STACKS Dates
                    </Text>
                </View>

            </View>

        </SafeAreaView >
    );
};
export default Dating;
