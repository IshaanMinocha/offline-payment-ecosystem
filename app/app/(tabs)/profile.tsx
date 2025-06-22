import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const userInfo = {
    name: 'Ishaan Minocha',
    phone: '+91 7678508162',
    email: 'rajesh.kumar@example.com',
    accountBalance: 15750.50,
    kycStatus: 'verified',
    memberSince: '2023',
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'This feature will be available soon!');
  };

  const handleSupport = () => {
    Alert.alert('Customer Support', 'Call us at 1800-123-4567 or email support@payapp.com');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => { } },
      ]
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const MenuItem = ({
    icon,
    title,
    subtitle,
    onPress,
    showArrow = true,
    rightComponent
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    onPress: () => void;
    showArrow?: boolean;
    rightComponent?: React.ReactNode;
  }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIcon}>
        <IconSymbol size={20} color="#FF9900" name={icon as any} />
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      {rightComponent || (showArrow && (
        <IconSymbol size={16} color="#999" name="chevron.right" />
      ))}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <IconSymbol
            size={32}
            color="#FF9900"
            name="person.crop.circle.fill"
            style={styles.headerIcon}
          />
          <ThemedText type="title" style={styles.headerTitle}>
            Profile
          </ThemedText>
          {/* <Text style={styles.headerSubtitle}>
            Manage your account settings
          </Text> */}
        </View>

        {/* User Info Card */}
        <View style={styles.userCard}>
          <View style={styles.userAvatar}>
            <IconSymbol size={40} color="#FFFFFF" name="person.fill" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userInfo.name}</Text>
            <Text style={styles.userPhone}>{userInfo.phone}</Text>
            <View style={styles.kycBadge}>
              <IconSymbol size={12} color="#10B981" name="checkmark.circle.fill" />
              <Text style={styles.kycText}>KYC Verified</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <IconSymbol size={16} color="#FF9900" name="pencil" />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <IconSymbol size={24} color="#FF9900" name="indianrupeesign.circle.fill" />
            <Text style={styles.balanceLabel}>Wallet Balance</Text>
          </View>
          <Text style={styles.balanceAmount}>
            {formatCurrency(userInfo.accountBalance)}
          </Text>
          <TouchableOpacity style={styles.addMoneyButton}>
            <Text style={styles.addMoneyText}>Add Money</Text>
          </TouchableOpacity>
        </View>

        {/* Account Settings */}
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>

          <MenuItem
            icon="person.circle"
            title="Personal Information"
            subtitle="Update your personal details"
            onPress={handleEditProfile}
          />

          <MenuItem
            icon="creditcard"
            title="Payment Methods"
            subtitle="Manage cards and bank accounts"
            onPress={() => Alert.alert('Payment Methods', 'Feature coming soon!')}
          />

          <MenuItem
            icon="shield.checkerboard"
            title="Security Settings"
            subtitle="PIN, biometric, and security"
            onPress={() => Alert.alert('Security', 'Feature coming soon!')}
          />
        </View> */}

        {/* Preferences */}
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <MenuItem
            icon="bell"
            title="Notifications"
            subtitle="Push notifications and alerts"
            onPress={() => { }}
            showArrow={false}
            rightComponent={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#DDD', true: '#FF9900' }}
                thumbColor={notificationsEnabled ? '#FFFFFF' : '#FFFFFF'}
              />
            }
          />

          <MenuItem
            icon="faceid"
            title="Biometric Login"
            subtitle="Use fingerprint or face ID"
            onPress={() => { }}
            showArrow={false}
            rightComponent={
              <Switch
                value={biometricEnabled}
                onValueChange={setBiometricEnabled}
                trackColor={{ false: '#DDD', true: '#FF9900' }}
                thumbColor={biometricEnabled ? '#FFFFFF' : '#FFFFFF'}
              />
            }
          />

          <MenuItem
            icon="globe"
            title="Language"
            subtitle="English (India)"
            onPress={() => Alert.alert('Language', 'Feature coming soon!')}
          />
        </View> */}

        {/* Support & Legal */}
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & Legal</Text>

          <MenuItem
            icon="questionmark.circle"
            title="Help & Support"
            subtitle="Get help with your account"
            onPress={handleSupport}
          />

          <MenuItem
            icon="doc.text"
            title="Terms & Conditions"
            subtitle="App terms and privacy policy"
            onPress={() => Alert.alert('Terms', 'Feature coming soon!')}
          />

          <MenuItem
            icon="star"
            title="Rate App"
            subtitle="Share your feedback"
            onPress={() => Alert.alert('Rate App', 'Thank you for your feedback!')}
          />
        </View> */}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <IconSymbol size={20} color="#EF4444" name="arrow.right.square" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* App Version */}
        {/* <Text style={styles.versionText}>
          Version 1.0.0 • Member since {userInfo.memberSince}
        </Text> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
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
  userCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF9900',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#232F3E',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  kycBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  kycText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
    marginLeft: 4,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#232F3E',
    marginBottom: 16,
  },
  addMoneyButton: {
    backgroundColor: '#FF9900',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  addMoneyText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#232F3E',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#232F3E',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});
