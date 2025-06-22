import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
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

export default function OTPVerificationScreen() {
    const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef<TextInput[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    setCanResend(true);
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleOTPChange = (value: string, index: number) => {
        if (value.length > 1) return; // Prevent multiple characters

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-submit when all fields are filled
        if (index === 5 && value && newOtp.every(digit => digit !== '')) {
            handleVerifyOTP(newOtp);
        }
    };

    const handleKeyPress = (key: string, index: number) => {
        if (key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerifyOTP = async (otpArray = otp) => {
        const otpString = otpArray.join('');

        if (otpString.length !== 6) {
            Alert.alert('Error', 'Please enter the complete 6-digit OTP');
            return;
        }

        setIsLoading(true);

        // Simulate OTP verification
        setTimeout(() => {
            setIsLoading(false);

            // For demo purposes, accept any 6-digit OTP
            if (otpString.length === 6) {
                Alert.alert(
                    'Login Successful!',
                    'Welcome to the app',
                    [
                        {
                            text: 'Continue',
                            onPress: () => router.replace('/(tabs)/paynow')
                        }
                    ]
                );
            } else {
                Alert.alert('Error', 'Invalid OTP. Please try again.');
                setOtp(['', '', '', '', '', '']);
                inputRefs.current[0]?.focus();
            }
        }, 2000);
    };

    const handleResendOTP = () => {
        setTimer(30);
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();

        Alert.alert('OTP Sent', 'A new OTP has been sent to your mobile number');

        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    setCanResend(true);
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleGoBack = () => {
        router.back();
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
                        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                            <IconSymbol
                                size={24}
                                color="#666"
                                name="chevron.left"
                            />
                        </TouchableOpacity>

                        <IconSymbol
                            size={48}
                            color="#FF9900"
                            name="message.circle.fill"
                            style={styles.headerIcon}
                        />
                        <ThemedText type="title" style={styles.headerTitle}>
                            Verify OTP
                        </ThemedText>
                        <Text style={styles.headerSubtitle}>
                            Enter the 6-digit code sent to{'\n'}
                            <Text style={styles.phoneNumber}>+91 {phoneNumber}</Text>
                        </Text>
                    </View>

                    {/* OTP Form */}
                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Enter OTP</Text>

                        <View style={styles.otpContainer}>
                            {otp.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    ref={(ref) => {
                                        if (ref) inputRefs.current[index] = ref;
                                    }}
                                    style={[
                                        styles.otpInput,
                                        digit && styles.otpInputFilled
                                    ]}
                                    value={digit}
                                    onChangeText={(value) => handleOTPChange(value, index)}
                                    onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    textAlign="center"
                                    autoFocus={index === 0}
                                />
                            ))}
                        </View>

                        {/* Verify Button */}
                        <TouchableOpacity
                            style={[
                                styles.verifyButton,
                                (otp.join('').length !== 6 || isLoading) && styles.verifyButtonDisabled
                            ]}
                            onPress={() => handleVerifyOTP()}
                            disabled={otp.join('').length !== 6 || isLoading}
                        >
                            {isLoading ? (
                                <Text style={styles.verifyButtonText}>Verifying...</Text>
                            ) : (
                                <View style={styles.verifyButtonContent}>
                                    <IconSymbol
                                        size={20}
                                        color="#FFFFFF"
                                        name="checkmark.circle.fill"
                                        style={styles.verifyButtonIcon}
                                    />
                                    <Text style={styles.verifyButtonText}>Verify & Continue</Text>
                                </View>
                            )}
                        </TouchableOpacity>

                        {/* Resend Section */}
                        <View style={styles.resendSection}>
                            {canResend ? (
                                <TouchableOpacity onPress={handleResendOTP}>
                                    <Text style={styles.resendText}>
                                        Didn&apos;t receive OTP? <Text style={styles.resendLink}>Resend</Text>
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <Text style={styles.timerText}>
                                    Resend OTP in <Text style={styles.timerCount}>{timer}s</Text>
                                </Text>
                            )}
                        </View>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        {/* <View style={styles.helpSection}>
                            <IconSymbol
                                size={16}
                                color="#666"
                                name="questionmark.circle"
                                style={styles.helpIcon}
                            />
                            <Text style={styles.helpText}>
                                Having trouble? Contact our support team
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
        marginTop: 40,
        marginBottom: 40,
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    headerIcon: {
        marginBottom: 20,
        marginTop: 20,
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
    phoneNumber: {
        fontWeight: '600',
        color: '#232F3E',
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
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#232F3E',
        marginBottom: 16,
        textAlign: 'center',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
        paddingHorizontal: 8,
    },
    otpInput: {
        width: 48,
        height: 56,
        borderWidth: 2,
        borderColor: '#E1E5E9',
        borderRadius: 12,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#232F3E',
        backgroundColor: '#F8F9FA',
    },
    otpInputFilled: {
        borderColor: '#FF9900',
        backgroundColor: '#FFF3E0',
    },
    verifyButton: {
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
        marginBottom: 20,
    },
    verifyButtonDisabled: {
        backgroundColor: '#CCC',
        shadowOpacity: 0,
        elevation: 0,
    },
    verifyButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    verifyButtonIcon: {
        marginRight: 10,
    },
    verifyButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resendSection: {
        alignItems: 'center',
    },
    resendText: {
        fontSize: 14,
        color: '#666',
    },
    resendLink: {
        color: '#FF9900',
        fontWeight: '600',
    },
    timerText: {
        fontSize: 14,
        color: '#666',
    },
    timerCount: {
        color: '#FF9900',
        fontWeight: '600',
    },
    footer: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    helpSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E1E5E9',
    },
    helpIcon: {
        marginRight: 8,
    },
    helpText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
}); 