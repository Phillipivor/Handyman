import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  // Mock appointments data
  const appointments = [
    {
      id: '1',
      service: 'Plumbing Repair',
      customer: 'John Doe',
      time: '09:00 AM',
      duration: '2 hours',
      status: 'confirmed',
      address: '123 Main St, City',
    },
    {
      id: '2',
      service: 'Pipe Installation',
      customer: 'Jane Smith',
      time: '02:00 PM',
      duration: '3 hours',
      status: 'pending',
      address: '456 Oak Ave, City',
    },
  ];

  // Generate dates for the week
  const generateWeekDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };

  // Generate time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM',
    '03:00 PM', '04:00 PM', '05:00 PM',
  ];

  const formatDate = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return {
      day: days[date.getDay()],
      date: date.getDate(),
    };
  };

  const isTimeSlotBooked = (time) => {
    return appointments.some(apt => apt.time === time);
  };

  const getAppointmentByTime = (time) => {
    return appointments.find(apt => apt.time === time);
  };

  return (
    <View style={styles.container}>
      {/* Calendar Strip */}
      <View style={styles.calendarStrip}>
        <Text style={styles.monthText}>
          {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.datesContainer}
        >
          {generateWeekDates().map((date, index) => {
            const formattedDate = formatDate(date);
            const isSelected = date.getDate() === selectedDate.getDate();
            
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateButton,
                  isSelected && styles.dateButtonSelected
                ]}
                onPress={() => setSelectedDate(date)}
              >
                <Text style={[
                  styles.dayText,
                  isSelected && styles.dateTextSelected
                ]}>
                  {formattedDate.day}
                </Text>
                <Text style={[
                  styles.dateText,
                  isSelected && styles.dateTextSelected
                ]}>
                  {formattedDate.date}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Time Slots */}
      <ScrollView style={styles.timeSlotContainer}>
        {timeSlots.map((time, index) => {
          const isBooked = isTimeSlotBooked(time);
          const appointment = isBooked ? getAppointmentByTime(time) : null;
          
          return (
            <View key={index} style={styles.timeSlotRow}>
              <View style={styles.timeIndicator}>
                <Text style={styles.timeText}>{time}</Text>
                <View style={styles.timeLineDot} />
                <View style={styles.timeLine} />
              </View>

              {isBooked ? (
                <View style={styles.appointmentCard}>
                  <View style={styles.appointmentHeader}>
                    <Text style={styles.appointmentService}>
                      {appointment.service}
                    </Text>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: appointment.status === 'confirmed' ? '#dcfce7' : '#fef3c7' }
                    ]}>
                      <Text style={[
                        styles.statusText,
                        { color: appointment.status === 'confirmed' ? '#16a34a' : '#d97706' }
                      ]}>
                        {appointment.status.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  
                  <Text style={styles.appointmentCustomer}>
                    {appointment.customer}
                  </Text>
                  <Text style={styles.appointmentDuration}>
                    Duration: {appointment.duration}
                  </Text>
                  <Text style={styles.appointmentAddress}>
                    {appointment.address}
                  </Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.emptySlot,
                    selectedTimeSlot === time && styles.emptySlotSelected
                  ]}
                  onPress={() => setSelectedTimeSlot(time)}
                >
                  <Text style={[
                    styles.emptySlotText,
                    selectedTimeSlot === time && styles.emptySlotTextSelected
                  ]}>
                    Available
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.blockButton]}
          onPress={() => {/* Handle block time */}}
        >
          <Text style={styles.blockButtonText}>Block Time</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.scheduleButton]}
          onPress={() => {/* Handle schedule */}}
        >
          <Text style={styles.scheduleButtonText}>Schedule Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  calendarStrip: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 15,
  },
  datesContainer: {
    paddingVertical: 10,
    gap: 10,
  },
  dateButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    marginRight: 10,
    backgroundColor: '#f1f5f9',
    minWidth: 60,
  },
  dateButtonSelected: {
    backgroundColor: '#0284c7',
  },
  dayText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  dateTextSelected: {
    color: '#fff',
  },
  timeSlotContainer: {
    flex: 1,
    padding: 15,
  },
  timeSlotRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timeIndicator: {
    width: 80,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 10,
  },
  timeLineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#94a3b8',
    marginBottom: 5,
  },
  timeLine: {
    width: 1,
    flex: 1,
    backgroundColor: '#e2e8f0',
  },
  appointmentCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginLeft: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  appointmentService: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  appointmentCustomer: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 5,
  },
  appointmentDuration: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 5,
  },
  appointmentAddress: {
    fontSize: 14,
    color: '#64748b',
  },
  emptySlot: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginLeft: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptySlotSelected: {
    borderColor: '#0284c7',
    backgroundColor: '#f0f9ff',
  },
  emptySlotText: {
    fontSize: 14,
    color: '#64748b',
  },
  emptySlotTextSelected: {
    color: '#0284c7',
  },
  actionContainer: {
    flexDirection: 'row',
    padding: 15,
    gap: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  actionButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  blockButton: {
    backgroundColor: '#fee2e2',
  },
  blockButtonText: {
    color: '#dc2626',
    fontSize: 16,
    fontWeight: '600',
  },
  scheduleButton: {
    backgroundColor: '#0284c7',
  },
  scheduleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
