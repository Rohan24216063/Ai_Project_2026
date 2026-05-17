import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { authAPI } from '../api/authAPI';

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      studentId: '',
      department: '',
      password: '',
      confirmPassword: '',
    }
  });

  const password = watch('password');

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError('');
    setSuccessMessage('');
    
    try {
      const response = await authAPI.registerStudent({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        studentId: data.studentId,
        department: data.department,
        password: data.password,
      });

      setSuccessMessage('✅ রেজিস্ট্রেশন সফল! এখন লগইন করুন।');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setApiError(
        error.response?.data?.message || 
        'রেজিস্ট্রেশন ব্যর্থ হয়েছে। দয়া করে আবার চেষ্টা করুন।'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            🎓 বিশ্ববিদ্যালয়
          </h1>
          <p className="text-gray-600">AI-চালিত ছাত্র সেবা সিস্টেম</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            ছাত্র হিসাবে রেজিস্টার করুন
          </h2>

          {/* Error Message */}
          {apiError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {apiError}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
              {successMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Row 1: First Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="form-label">
                  👤 নাম (প্রথম)
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="আপনার নাম"
                  {...register('firstName', {
                    required: 'প্রথম নাম প্রয়োজন',
                    minLength: {
                      value: 2,
                      message: 'নাম কমপক্ষে ২ অক্ষর হতে হবে'
                    }
                  })}
                />
                {errors.firstName && (
                  <p className="form-error">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label className="form-label">
                  👤 নাম (শেষ)
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="আপনার পরিবার নাম"
                  {...register('lastName', {
                    required: 'শেষ নাম প্রয়োজন',
                  })}
                />
                {errors.lastName && (
                  <p className="form-error">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Row 2: Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="form-label">
                  📧 ইমেইল
                </label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="your.email@university.edu"
                  {...register('email', {
                    required: 'ইমেইল প্রয়োজন',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'সঠিক ইমেইল ঠিকানা লিখুন'
                    }
                  })}
                />
                {errors.email && (
                  <p className="form-error">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="form-label">
                  📱 ফোন নম্বর
                </label>
                <input
                  type="tel"
                  className="input-field"
                  placeholder="০১৭/০১৮/০১৯XXXXXXXX"
                  {...register('phone', {
                    required: 'ফোন নম্বর প্রয়োজন',
                    pattern: {
                      value: /^[০-৯0-9]{10,11}$/,
                      message: 'সঠিক ফোন নম্বর লিখুন'
                    }
                  })}
                />
                {errors.phone && (
                  <p className="form-error">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Row 3: Student ID & Department */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="form-label">
                  🎓 ছাত্র আইডি
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="আপনার ছাত্র আইডি (যেমন: 20200123)"
                  {...register('studentId', {
                    required: 'ছাত্র আইডি প্রয়োজন',
                  })}
                />
                {errors.studentId && (
                  <p className="form-error">{errors.studentId.message}</p>
                )}
              </div>

              <div>
                <label className="form-label">
                  🏢 বিভাগ
                </label>
                <select
                  className="input-field"
                  {...register('department', {
                    required: 'বিভাগ নির্বাচন করুন',
                  })}
                >
                  <option value="">-- বিভাগ নির্বাচন করুন --</option>
                  <option value="CSE">কম্পিউটার বিজ্ঞান</option>
                  <option value="EEE">বৈদ্যুতিক প্রকৌশল</option>
                  <option value="ME">যান্ত্রিক প্রকৌশল</option>
                  <option value="CE">সিভিল প্রকৌশল</option>
                  <option value="BE">জৈব প্রকৌশল</option>
                  <option value="BBA">ব্যবসায়িক প্রশাসন</option>
                  <option value="ARCH">স্থাপত্য</option>
                  <option value="OTHER">অন্যান্য</option>
                </select>
                {errors.department && (
                  <p className="form-error">{errors.department.message}</p>
                )}
              </div>
            </div>

            {/* Row 4: Password & Confirm Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="form-label">
                  🔒 পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="শক্তিশালী পাসওয়ার্ড তৈরি করুন"
                  {...register('password', {
                    required: 'পাসওয়ার্ড প্রয়োজন',
                    minLength: {
                      value: 8,
                      message: 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষর হতে হবে'
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
                      message: 'পাসওয়ার্ডে বড় অক্ষর, ছোট অক্ষর এবং সংখ্যা থাকতে হবে'
                    }
                  })}
                />
                {errors.password && (
                  <p className="form-error">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="form-label">
                  🔒 পাসওয়ার্ড নিশ্চিত করুন
                </label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="পাসওয়ার্ড আবার লিখুন"
                  {...register('confirmPassword', {
                    required: 'পাসওয়ার্ড নিশ্চিতকরণ প্রয়োজন',
                    validate: (value) =>
                      value === password || 'পাসওয়ার্ড মিলছে না'
                  })}
                />
                {errors.confirmPassword && (
                  <p className="form-error">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-6"
            >
              {loading ? '⏳ রেজিস্টার হচ্ছে...' : '✅ রেজিস্টার করুন'}
            </button>
          </form>

          {/* Divider */}
          <div className="border-t border-gray-300 my-6"></div>

          {/* Login Link */}
          <p className="text-center text-gray-600">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
            <Link
              to="/login"
              className="text-primary font-semibold hover:text-secondary transition"
            >
              এখানে লগইন করুন
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-6">
          © ২০२६ বিশ্ববিদ্যালয় ব্যবস্থাপনা সিস্টেম
        </p>
      </div>
    </div>
  );
}
