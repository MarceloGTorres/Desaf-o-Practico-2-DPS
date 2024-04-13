import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Modal, SafeAreaView, Alert, Platform, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, differenceInDays } from 'date-fns'; 

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activityName, setActivityName] = useState('');
  const [subject, setSubject] = useState('');
  const [teamName, setTeamName] = useState('');
  const [dueTime, setDueTime] = useState(new Date());
  const [activities, setActivities] = useState([]);
  const [newActivityModalVisible, setNewActivityModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleLogin = () => {
    if (username === '' || password === '') {
      Alert.alert('Error', 'Please enter your username and password.');
      return;
    }
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setMenuVisible(false);
  };

  const handleRegistration = () => {
    setShowRegistrationForm(true);
  };

  const handleRegistrationSubmit = () => {
    if (username === '' || email === '' || password === '' || confirmPassword === '') {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    setShowRegistrationForm(false);
  };

  const addActivity = () => {
    if (activityName === '' || subject === '' || teamName === '' || dueTime === '') {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    const newActivity = {
      activityName: activityName,
      subject: subject,
      teamName: teamName,
      dueTime: dueTime
    };
    setActivities([...activities, newActivity]);
    setNewActivityModalVisible(false);
    setActivityName('');
    setSubject('');
    setTeamName('');
    setDueTime(new Date());
  };

  const handleActivityLongPress = (index) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this activity?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => confirmDeleteActivity(index) }
      ]
    );
  };

  const confirmDeleteActivity = (index) => {
    const updatedActivities = [...activities];
    updatedActivities.splice(index, 1);
    setActivities(updatedActivities);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dueTime;
    setShowDatePicker(Platform.OS === 'ios');
    setDueTime(currentDate);
  };

  const getActivityItemStyle = (dueTime) => {
    const today = new Date();
    const activityDate = new Date(dueTime);
    const differenceInDays = Math.ceil((activityDate - today) / (1000 * 60 * 60 * 24));

    if (today.getDate() === activityDate.getDate() && today.getMonth() === activityDate.getMonth() && today.getFullYear() === activityDate.getFullYear()) {
      return styles.greenActivityItem;
    } else if (today > activityDate) {
      return styles.redActivityItem; 
    } else {
      return styles.blueActivityItem;
    }
  };

  const renderLogin = () => (
    <View style={styles.loginContainer}>
      <Text style={styles.loginTitle}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegistration}>
        <Text style={styles.registerLink}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );

  const renderLogout = () => (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="menu" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>RecordaTask</Text>
      </View>
      {activities.length === 0 ? (
        <View style={styles.noActivitiesContainer}>
          <Text style={styles.noActivitiesText}>No activities </Text>
        </View>
      ) : (
        <ScrollView style={styles.activitiesContainer}>
          {activities.map((activity, index) => {
            const activityDate = new Date(activity.dueTime);
            const activityStyle = getActivityItemStyle(activity.dueTime);
            const formattedDate = activityDate.toLocaleDateString();
            const formattedTime = activityDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return (
              <TouchableWithoutFeedback key={index} onLongPress={() => handleActivityLongPress(index)}>
                <View style={[styles.activityItem, activityStyle]}>
                  <View>
                    <Text style={styles.activityTitle}>{activity.activityName}</Text>
                    <Text>{activity.subject}</Text>
                    <Text>{activity.teamName}</Text>
                    <Text>Due Date: {formattedDate}</Text>
                    <Text>Due Time: {formattedTime}</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>
      )}
      <TouchableOpacity style={styles.floatingButton} onPress={() => setNewActivityModalVisible(true)}>
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );

  const renderRegistration = () => (
    <View style={styles.registerContainer}>
      <Text style={styles.registerTitle}>User Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegistrationSubmit}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => setMenuVisible(false)} style={styles.menuCloseButton}>
            <Ionicons name="close" size={352} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => setNewActivityModalVisible(true)}>
            <Text style={styles.menuItemText}>Add Activity</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Text style={styles.menuItemText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {!isLoggedIn && !showRegistrationForm ? renderLogin() : isLoggedIn ? renderLogout() : renderRegistration()}
      <Modal
        animationType="slide"
        transparent={true}
        visible={newActivityModalVisible}
        onRequestClose={() => setNewActivityModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Activity</Text>
            <TextInput
              style={styles.input}
              placeholder="Activity Name"
              value={activityName}
              onChangeText={(text) => setActivityName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Subject"
              value={subject}
              onChangeText={(text) => setSubject(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Team Name"
              value={teamName}
              onChangeText={(text) => setTeamName(text)}
            />
            <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
              <Text>{dueTime.toLocaleString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={dueTime}
                mode="datetime"
                display="default"
                onChange={handleDateChange}
              />
            )}
            <TouchableOpacity style={styles.addButton} onPress={addActivity}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setNewActivityModalVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 15,
    paddingTop: 60,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginTitle: {
    fontSize: 28,
    marginBottom: 25,
    color: '#444',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 2,
    borderColor: '#999',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 25,
    width: '100%',
    backgroundColor: '#FFF',
    color: '#555',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#5cb85c', // verde claro
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  registerLink: {
    marginTop: 20,
    color: '#5bc0de', // azul claro
    fontWeight: 'bold',
  },
  registerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerTitle: {
    fontSize: 28,
    marginBottom: 25,
    color: '#444',
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#5cb85c', // verde claro
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  mainContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#5bc0de', // azul claro
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  activitiesContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  noActivitiesText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#333',
    fontSize: 18,
  },
  activityItem: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#5cb85c', // verde claro
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 25,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#444',
  },
  addButton: {
    backgroundColor: '#5cb85c', // verde claro
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  closeButton: {
    backgroundColor: '#800080', // púrpura
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  menuContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    width: '80%',
    marginTop: 20,
    marginLeft: 'auto',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  menuCloseButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  menuItem: {
    marginBottom: 20,
  },
  menuItemText: {
    fontSize: 20,
    color: '#444',
  },
  greenActivityItem: {
    backgroundColor: '#00FF00', // verde claro
  },
  redActivityItem: {
    backgroundColor: '#FF0000', // rojo claro
  },
  blueActivityItem: {
    backgroundColor: '#ADD8E6', // azul claro
  },
});

