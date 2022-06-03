// Importing the React library
import React from 'react';
// Importing tags from react-native
import { Text, Button, View, Image, Platform } from 'react-native';
// Importing ImagePicker from expo-image-picker
import * as ImagePicker from 'expo-image-picker';
// Importing Permissions from expo-permissions
import * as Permissions from 'expo-permissions';

// Creating a component
export default class PickImage extends React.Component {
    state = {
        image: null,
        result: null
    };

    render() {
        let { image, result } = this.state;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
               { this.state.result ? <Text style={{ fontSize: 25, marginBottom: 20}}>{result.prediction}</Text> : null }
                <Button
                    title="Pick an image from camera roll"
                    onPress={this._pickImage}
                />
            </View>
        );
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Platform.OS === 'web') {
            const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    uploadImage = async (uri) => {
        const data = new FormData();
        let filename = uri.split('/')[uri.split('/').length - 1];
        let type = `image/${uri.split('.')[uri.split('.').length - 1]}`;
        const fileToUpload = {
            uri: uri,
            name: filename,
            type: type
        };
        data.append('alphabet', fileToUpload);
        fetch("https://48e4-49-37-41-236.in.ngrok.io/predict-alphabet", {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => response.json())
            .then((result) => {
                this.setState({ result: result })
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    };
    
    _pickImage = async () => {
        try{
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            });

            if (!result.cancelled) {
                this.setState({ image: result.data });
                this.uploadImage(result.uri);
            }
        } catch (E) {
            console.log(E);
        }
    };
}