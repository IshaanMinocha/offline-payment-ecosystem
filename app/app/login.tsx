import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function LoginScreen() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSendOTP = async () => {
        if (!phoneNumber.trim()) {
            Alert.alert('Error', 'Please enter your mobile number');
            return;
        }

        if (phoneNumber.length !== 10) {
            Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
            return;
        }

        setIsLoading(true);

        // Simulate OTP sending
        setTimeout(() => {
            setIsLoading(false);
            router.push({
                pathname: '/otp-verification',
                params: { phoneNumber: phoneNumber }
            });
        }, 1500);
    };

    const formatPhoneNumber = (text: string) => {
        // Remove all non-numeric characters
        const cleaned = text.replace(/\D/g, '');
        // Limit to 10 digits
        return cleaned.substring(0, 10);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.content}>
                    {/* Header */}
                    <View style={styles.header}>
                        <IconSymbol
                            size={48}
                            color="#FF9900"
                            name="phone.circle.fill"
                            style={styles.headerIcon}
                        />
                        <ThemedText type="title" style={styles.headerTitle}>
                            Welcome Back
                        </ThemedText>
                        <Text style={styles.headerSubtitle}>
                            Enter your mobile number to continue
                        </Text>
                    </View>

                    {/* Login Form */}
                    <View style={styles.formContainer}>
                        <View style={styles.inputSection}>
                            <Text style={styles.label}>Mobile Number</Text>
                            <View style={styles.inputWrapper}>
                                <View style={styles.countryCode}>
                                    <IconSymbol
                                        size={16}
                                        color="#666"
                                        name="flag.fill"
                                        style={styles.flagIcon}
                                    />
                                    <Text style={styles.countryCodeText}>+91</Text>
                                </View>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Enter 10-digit number"
                                    placeholderTextColor="#999"
                                    value={phoneNumber}
                                    onChangeText={(text) => setPhoneNumber(formatPhoneNumber(text))}
                                    keyboardType="phone-pad"
                                    maxLength={10}
                                    autoFocus
                                />
                            </View>
                        </View>

                        {/* Send OTP Button */}
                        <TouchableOpacity
                            style={[
                                styles.sendOTPButton,
                                (!phoneNumber.trim() || phoneNumber.length !== 10 || isLoading) && styles.sendOTPButtonDisabled
                            ]}
                            onPress={handleSendOTP}
                            disabled={!phoneNumber.trim() || phoneNumber.length !== 10 || isLoading}
                        >
                            {isLoading ? (
                                <Text style={styles.sendOTPButtonText}>Sending OTP...</Text>
                            ) : (
                                <View style={styles.sendOTPButtonContent}>
                                    <IconSymbol
                                        size={20}
                                        color="#FFFFFF"
                                        name="arrow.right.circle.fill"
                                        style={styles.sendOTPButtonIcon}
                                    />
                                    <Text style={styles.sendOTPButtonText}>Send OTP</Text>
                                </View>
                            )}
                        </TouchableOpacity>

                        {/* Info Text */}
                        <Text style={styles.infoText}>
                            We&apos;ll send you a verification code on this number
                        </Text>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        {/* <View style={styles.securityNote}>
                            <IconSymbol
                                size={16}
                                color="#10B981"
                                name="lock.shield.fill"
                                style={styles.securityIcon}
                            />
                            <Text style={styles.securityText}>
                                Your number is safe and secure with us
                            </Text>
                        </View> */}
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8FA',
    },
    keyboardView: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    header: {
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 40,
    },
    headerIcon: {
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#232F3E',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    inputSection: {
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#232F3E',
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#E1E5E9',
        minHeight: 56,
        paddingHorizontal: 16,
    },
    countryCode: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 12,
        borderRightWidth: 1,
        borderRightColor: '#E1E5E9',
        marginRight: 12,
    },
    flagIcon: {
        marginRight: 6,
    },
    countryCodeText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#232F3E',
    },
    textInput: {
        flex: 1,
        fontSize: 18,
        color: '#232F3E',
        paddingVertical: 16,
        fontWeight: '500',
    },
    sendOTPButton: {
        backgroundColor: '#FF9900',
        borderRadius: 12,
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#FF9900',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
        marginBottom: 16,
    },
    sendOTPButtonDisabled: {
        backgroundColor: '#CCC',
        shadowOpacity: 0,
        elevation: 0,
    },
    sendOTPButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sendOTPButtonIcon: {
        marginRight: 10,
    },
    sendOTPButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    infoText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        lineHeight: 20,
    },
    footer: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    securityNote: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0FDF4',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#BBF7D0',
    },
    securityIcon: {
        marginRight: 8,
    },
    securityText: {
        fontSize: 12,
        color: '#059669',
        fontWeight: '500',
    },
}); 