import React from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class BookTransactionScreen extends React.Component{

    constructor(){
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal',
            scannedBookID: '',
            scannedStudentID: '',
        }
    }

    getCameraPermission = async(id) => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions: status === 'granted',
            buttonState: id
        })
    }

    handleBarcodeScanned = async({type, data}) => {
        const {buttonState} = this.state
        if(buttonState === 'BookID'){
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: 'normal',
        })
      }else if(buttonState === 'StudentID'){
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: 'normal',
        })
      }
    }

    render(){

        const hasCameraPermissions = this.state.hasCameraPermissions

        const scanned = this.state.scanned

        const buttonState = this.state.buttonState

        if (buttonState !== "normal" && hasCameraPermissions){
            return(
                <BarCodeScanner
                    onBarCodeScanned = {scanned?undefined:this.handleBarcodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            )
        }
        else if(buttonState === 'normal'){

        return(
            <View style={styles.container}>

                <View>

                    <Image
                        source={require("./assets/booklogo.jpg")}
                        style={{
                            width: 200,
                            height: 200
                        }}
                    />

                    <Text style={{
                        textAlign: 'center',
                        fontSize: 30
                    }}> WiLy </Text>

                </View>

                <View style={styles.inputView}>

                    <TextInput
                        style={styles.inputBox}
                        placeholder='BOOK ID'
                        value={this.state.scannedBookID}
                    />

                    <TouchableOpacity 
                    styles={styles.scanButton} 
                    onPress={() => {this.getCameraPermission('BookID')}}
                    >
                        <Text style={styles.buttonText}>SCAN</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.inputView}>

                    <TextInput
                        style={styles.inputBox}
                        placeholder='STUDENT ID'
                        value={this.state.scannedStudentID}
                    />

                    <TouchableOpacity 
                    styles={styles.scanButton}
                    onPress={() => {this.getCameraPermission('StudentID')}}
                    >
                        <Text style={styles.buttonText}>SCAN</Text>
                    </TouchableOpacity>

                </View>

            </View>
        );
    }
}

}

const styles = StyleSheet.create({
    scanButton: {
        borderWeight: 5,
        borderRadius: 50,
        backgroundColour: 'lightblue',
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: 20,
        textDecorationLine: 'underline'
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    displaytext: {
        fontSize: 30,
        textDecorationLine: 'underline'
    },
    inputView: {
        flexDirection: 'row',
        margin: 50
    },
    inputBox: {
        width: 100,
        height: 30,
        borderWidth: 5,
        fonstSize: 20
    }
})