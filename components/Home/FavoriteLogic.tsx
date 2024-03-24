import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import {
    addItemsToAsyncStorage,
    getItemsFromAsyncStorage,
    removeItemsFromAsyncStorage,
} from "../../shared/helper";
import { COLORS } from "../../assets";
import { AntDesign } from "@expo/vector-icons";

interface FavoriteLogicProps {
    setIsFavourite: React.Dispatch<React.SetStateAction<boolean>>;
    isFavourite: boolean;
    item: any;
}


export default function FavoriteLogic({
    setIsFavourite,
    isFavourite,
    item,
}: FavoriteLogicProps) {
    useFocusEffect(
        React.useCallback(() => {
            checkIfFavourited();
        }, [])
    );

    const handleChangeFavourite = async () => {
        let key = "favorites";
        if (isFavourite) {
            //remove
            await removeItemsFromAsyncStorage(item.id, key);
        } else {
            await addItemsToAsyncStorage(item, key);
        }
        setIsFavourite(!isFavourite);
    };

    const checkIfFavourited = async () => {
        const fav = await getItemsFromAsyncStorage("favorites");
        const isAlreadyFavorited = fav.some((i: any) => i.id === item.id);
        setIsFavourite(isAlreadyFavorited);
    };

    return (
        <TouchableOpacity
            style={{
                padding: 10,
                borderRadius: 100,
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center"
            }}
            onPress={handleChangeFavourite}
        >
            <AntDesign name={"heart"} size={30} color={isFavourite ? COLORS.errorColor : COLORS.darkGray} />
        </TouchableOpacity>
    );
}

