import {useEffect, useState} from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";

import {useSelector} from "react-redux";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase/config";

export const CommentsScreen = ({route}) => {
  const {postId} = route.params;
  // const [data, setData] = useState(initialState);
  const [isShowKeyboadr, setIsShowKeyboadr] = useState(false);

  const [comment, setComment] = useState("");
  const {login} = useSelector((state) => state.auth);

  // const createPost = async () => {
  //   db.firestore()
  //     .collection("posts")
  //     .doc(postId)
  //     .collection("comments")
  //     .add({comment, login});
  // };

  const createPost = async () => {
    try {
      const ref = doc(db, "posts", postId);

      await updateDoc(ref, {comment, login});
      console.log("document updated");
    } catch (error) {
      console.log(error);
    }
  };

  // const [dimensions, setDimensions] = useState(
  //   Dimensions.get("window").width - 16 * 2
  // );

  // useEffect(() => {
  //   const onChange = () => {
  //     const width = Dimensions.get("window").width - 16 * 2;
  //     setDimensions(width);
  //   };
  //   Dimensions.addEventListener("change", onChange);
  //   return () => {
  //     Dimensions.removeEventListener("change", onChange);
  //   };
  // }, []);

  const handleShowKeyboard = () => {
    setIsShowKeyboadr(true);
  };
  const handleHideKeyboard = () => {
    setIsShowKeyboadr(false);
    Keyboard.dismiss();
  };

  // const onSubmit = () => {
  //   console.log("data", data);
  //   setData(initialState);
  // };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.post}>
        <View style={styles.imgBox}>
          <Image
            source={require("../../assets/img/blackSea.jpg")}
            style={styles.postImg}
          />
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.commentBox}>
            <View style={styles.commentItem}>
              <Image
                style={styles.commentAvatar}
                source={require("../../assets/img/avatarGuest.jpg")}
              />
              <View style={styles.commentInner}>
                <Text style={styles.commentText}>
                  Really love your most recent photo. I’ve been trying to
                  capture the same thing for a few months and would love some
                  tips!
                </Text>

                <Text style={styles.commentData}>09 июня, 2020 | 08:40</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Комментировать..."
            value={comment}
            onFocus={() => {
              handleShowKeyboard();
            }}
            onChangeText={(comment) => {
              setComment(comment);
            }}
          />
          <TouchableOpacity
            style={styles.sendBtn}
            activeOpacity={0.8}
            // onPress={onSubmit}
            onPress={createPost}
          >
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  scrollView: {
    height: 220,
  },

  imgBox: {
    marginVertical: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  postImg: {
    width: 343,
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  infoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  textComments: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,

    color: "#BDBDBD",
  },

  commentBox: {
    marginBottom: 32,
    gap: 24,
  },

  commentItem: {
    flexDirection: "row",
    gap: 16,
  },
  commentItemNext: {
    flexDirection: "row-reverse",
    gap: 16,
  },

  commentAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#212121",
  },

  commentInner: {
    width: 300,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",

    borderTopLeftRadius: 0,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  commentInnerNext: {
    width: 300,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",

    borderTopLeftRadius: 6,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },

  commentText: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    marginRight: 0,
    marginBottom: 8,

    color: "#212121",
  },

  commentData: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    textAlign: "right",

    color: "#BDBDBD",
  },
  commentDataNext: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    textAlign: "left",

    color: "#BDBDBD",
  },
  inputBox: {
    position: "relative",
    // justifyContent: "flex-end",
    marginBottom: 150,
  },

  input: {
    padding: 16,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
  },

  sendBtn: {
    position: "absolute",
    top: 12,
    right: 12,

    width: 34,
    height: 34,

    borderRadius: 17,
    color: "#fff",
    backgroundColor: "#FF6C00",
  },
  sendText: {
    fontSize: 10,
    textAlign: "center",
    paddingVertical: 10,
    color: "#fff",
  },
});
