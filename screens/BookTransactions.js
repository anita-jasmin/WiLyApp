import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";
export default class BookTransactions extends Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: "",
      buttonState: "normal",
      scanBookId: "",
      scanStudentId: "",
    };
  }
  getCameraPermissions = async (id) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions: status === "granted",
      buttonState: id,
      scanned: false,
    });
  };
  handleBarCodeScan = async ({ data }) => {
    const { buttonState } = this.state;
    if (buttonState === "bookId") {
      this.setState({
        scanned: true,
        scanBookId: data,
        buttonState: "normal",
      });
    } else if (buttonState === "studentId") {
      this.setState({
        scanned: true,
        scanStudentId: data,
        buttonState: "normal",
      });
    }
  };
  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const buttonState = this.state.buttonState;
    const scanned = this.state.scanned;
    if (buttonState !== "normal" && hasCameraPermissions) {
      return (
        <BarCodeScanner
          style={StyleSheet.absoluteFillObject}
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScan}
        />
      );
    } else if (buttonState === "normal") {
      return (
        <View style={styles.container}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputBox}
              value={this.state.scanBookId}
              // onChangeText={(text) => {
              //   this.setState({
              //     scanBookId: text,
              //   });
              // }}
              placeholder="Book Id"
            />
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => {
                this.getCameraPermissions("bookId");
              }}
            >
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputBox}
              // onChangeText={(text) => {
              //   this.setState({
              //     scanStudentId: text,
              //   });
              // }}
              value={this.state.scanStudentId}
              placeholder="Student Id"
            />
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => {
                this.getCameraPermissions("studentId");
              }}
            >
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  displayText: { fontSize: 15, textDecorationLine: "underline" },
  scanButton: { backgroundColor: "#2196F3", padding: 10, margin: 10 },
  buttonText: { fontSize: 15, textAlign: "center", marginTop: 10 },
  inputView: { flexDirection: "row", margin: 20 },
  inputBox: {
    width: 200,
    height: 40,
    borderWidth: 1.5,
    borderRightWidth: 0,
    fontSize: 20,
  },
  scanButton: {
    backgroundColor: "#66BB6A",
    width: 50,
    borderWidth: 1.5,
    borderLeftWidth: 0,
  },
});
