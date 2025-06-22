import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function PayNowScreen() {
  const [recipientNumber, setRecipientNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendPayment = async () => {
    if (!recipientNumber.trim()) {
      Alert.alert('Error', 'Please enter a recipient mobile number');
      return;
    }

    if (!amount.trim() || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    setIsLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Payment Sent!',
        `Successfully sent ₹${parseFloat(amount).toFixed(2)} to ${recipientNumber}`,
        [{
          text: 'OK', onPress: () => {
            setRecipientNumber('');
            setAmount('');
          }
        }]
      );
    }, 2000);
  };

  const formatAmount = (text: string) => {
    // Remove non-numeric characters except decimal point
    const cleaned = text.replace(/[^0-9.]/g, '');

    // Ensure only one decimal point
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts.slice(1).join('');
    }

    // Limit to 2 decimal places
    if (parts[1] && parts[1].length > 2) {
      return parts[0] + '.' + parts[1].substring(0, 2);
    }

    return cleaned;
  };

  const formatIndianCurrency = (amount: string) => {
    const num = parseFloat(amount || '0');
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(num).replace('₹', '');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <IconSymbol
              size={32}
              color="#FF9900"
              name="indianrupeesign.circle.fill"
              style={styles.headerIcon}
            />
            <ThemedText type="title" style={styles.headerTitle}>
              Send Money
            </ThemedText>
            {/* <Text style={styles.headerSubtitle}>
              Transfer money with ease
            </Text> */}
          </View>

          {/* Payment Form */}
          <View style={styles.formContainer}>
            {/* Recipient Section */}
            <View style={styles.inputSection}>
              <Text style={styles.label}>Recipient Mobile Number</Text>
              <View style={styles.inputWrapper}>
                <IconSymbol
                  size={20}
                  color="#666"
                  name="phone.fill"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter 10-digit mobile number"
                  placeholderTextColor="#999"
                  value={recipientNumber}
                  onChangeText={setRecipientNumber}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              </View>
            </View>

            {/* Amount Section */}
            <View style={styles.inputSection}>
              <Text style={styles.label}>Amount</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.currencySymbol}>₹</Text>
                <TextInput
                  style={[styles.textInput, styles.amountInput]}
                  placeholder="0.00"
                  placeholderTextColor="#999"
                  value={amount}
                  onChangeText={(text) => setAmount(formatAmount(text))}
                  keyboardType="decimal-pad"
                  maxLength={10}
                />
              </View>
            </View>

            {/* Quick Amount Buttons */}
            <View style={styles.quickAmountContainer}>
              <Text style={styles.quickAmountLabel}>Quick amounts:</Text>
              <View style={styles.quickAmountButtons}>
                {['100', '500', '1000', '2000'].map((quickAmount) => (
                  <TouchableOpacity
                    key={quickAmount}
                    style={styles.quickAmountButton}
                    onPress={() => setAmount(quickAmount)}
                  >
                    <Text style={styles.quickAmountText}>₹{quickAmount}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Payment Summary */}
            {amount && recipientNumber ? (
              <View style={styles.summaryContainer}>
                <Text style={styles.summaryTitle}>Payment Summary</Text>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>To:</Text>
                  <Text style={styles.summaryValue}>+91 {recipientNumber}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Amount:</Text>
                  <Text style={styles.summaryAmount}>₹{formatIndianCurrency(amount)}</Text>
                </View>
              </View>
            ) : null}

            {/* Send Button */}
            <TouchableOpacity
              style={[
                styles.sendButton,
                (!recipientNumber.trim() || !amount.trim() || isLoading) && styles.sendButtonDisabled
              ]}
              onPress={handleSendPayment}
              disabled={!recipientNumber.trim() || !amount.trim() || isLoading}
            >
              {isLoading ? (
                <Text style={styles.sendButtonText}>Processing Payment...</Text>
              ) : (
                <View style={styles.sendButtonContent}>
                  <IconSymbol
                    size={20}
                    color="#FFFFFF"
                    name="paperplane.fill"
                    style={styles.sendButtonIcon}
                  />
                  <Text style={styles.sendButtonText}>Send Money</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Security Note */}
          {/* <View style={styles.securityNote}>
            <IconSymbol
              size={16}
              color="#666"
              name="lock.shield.fill"
              style={styles.securityIcon}
            />
            <Text style={styles.securityText}>
              Your transactions are secured with bank-grade encryption
            </Text>
          </View> */}
        </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  headerIcon: {
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#232F3E',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E1E5E9',
    paddingHorizontal: 12,
    minHeight: 48,
  },
  inputIcon: {
    marginRight: 10,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: '600',
    color: '#232F3E',
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#232F3E',
    paddingVertical: 12,
  },
  amountInput: {
    fontSize: 18,
    fontWeight: '600',
  },
  quickAmountContainer: {
    marginBottom: 24,
  },
  quickAmountLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  quickAmountButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAmountButton: {
    backgroundColor: '#FFF3E0',
    borderWidth: 1,
    borderColor: '#FF9900',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    minWidth: 60,
    alignItems: 'center',
  },
  quickAmountText: {
    color: '#FF9900',
    fontWeight: '600',
    fontSize: 14,
  },
  summaryContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#232F3E',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#232F3E',
    fontWeight: '500',
  },
  summaryAmount: {
    fontSize: 16,
    color: '#FF9900',
    fontWeight: 'bold',
  },
  sendButton: {
    backgroundColor: '#FF9900',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF9900',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  sendButtonDisabled: {
    backgroundColor: '#CCC',
    shadowOpacity: 0,
    elevation: 0,
  },
  sendButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sendButtonIcon: {
    marginRight: 8,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  securityIcon: {
    marginRight: 8,
  },
  securityText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    flex: 1,
  },
});
