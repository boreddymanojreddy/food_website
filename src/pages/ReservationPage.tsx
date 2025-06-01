import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Available time slots
const timeSlots = [
  '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM',
  '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM',
  '7:00 PM', '7:30 PM',
  '8:00 PM'
];

const ReservationPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    notes: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];
  
  // Get date 30 days from now for max date
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login', { state: { redirectTo: '/reservation' } });
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSuccess('Table reserved successfully! You will receive a confirmation email shortly.');
      setFormData({
        date: '',
        time: '',
        guests: '2',
        notes: ''
      });
    } catch (err) {
      setError('Failed to reserve table. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Reserve a Table</h1>
            <p className="text-gray-600">Book your dining experience at our college canteen</p>
          </div>

          {error && (
            <div className="bg-error-50 text-error-500 p-3 rounded-md flex items-start mb-6">
              <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-success-50 text-success-500 p-3 rounded-md flex items-start mb-6">
              <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
              <p>{success}</p>
            </div>
          )}

          <div className="card p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="date" className="block text-gray-700 mb-1">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={today}
                      max={maxDateStr}
                      className="input pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="time" className="block text-gray-700 mb-1">
                    Time
                  </label>
                  <div className="relative">
                    <Clock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="input pl-10"
                      required
                    >
                      <option value="">Select time</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="guests" className="block text-gray-700 mb-1">
                    Number of Guests
                  </label>
                  <div className="relative">
                    <Users size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="input pl-10"
                      required
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="notes" className="block text-gray-700 mb-1">
                  Special Requests (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="input min-h-[100px]"
                  placeholder="Any special requests or preferences?"
                />
              </div>

              <button
                type="submit"
                className={`btn btn-primary w-full py-3 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Reserving Table...
                  </span>
                ) : (
                  'Reserve Table'
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReservationPage;