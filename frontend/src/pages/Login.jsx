import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { authAPI } from '../api/authAPI';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError('');
    
    try {
      const response = await authAPI.login(data);
      
      // Token এবং user info সংরক্ষণ
      localStorage.setItem('jwtToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Dashboard-এ রিডাইরেক্ট
      navigate(`/${response.user.role.toLowerCase()}/dashboard`);
    } catch (error) {
      setApiError(
        error.response?.data?.message || 
        'লগিন করতে ব্যর্থ হয়েছে। দয়া করে আবার চেষ্টা করুন।'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-center bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            🎓 বিশ্ববিদ্যালয়
          </h1>
          <p className="text-gray-600">AI-চালিত ছাত্র সেবা সিস্টেম</p>
        </div>

        {/* Card */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            লগইন করুন
          </h2>

          {/* Error Message */}
          {apiError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {apiError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
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

            {/* Password Field */}
            <div>
              <label className="form-label">
                🔒 পাসওয়ার্ড
              </label>
              <input
                type="password"
                className="input-field"
                placeholder="আপনার পাসওয়ার্ড"
                {...register('password', {
                  required: 'পাসওয়ার্ড প্রয়োজন',
                  minLength: {
                    value: 6,
                    message: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে'
                  }
                })}
              />
              {errors.password && (
                <p className="form-error">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-6"
            >
              {loading ? '⏳ লগইন হচ্ছে...' : '✅ লগইন করুন'}
            </button>
          </form>

          {/* Divider */}
          <div className="border-t border-gray-300 my-6"></div>

          {/* Register Link */}
          <p className="text-center text-gray-600">
            এখনও অ্যাকাউন্ট নেই?{' '}
            <Link
              to="/register"
              className="text-primary font-semibold hover:text-secondary transition"
            >
              এখানে রেজিস্টার করুন
            </Link>
          </p>

          {/* Demo Credentials */}
          <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-xs text-gray-600 mb-2">
              <strong>টেস্টিংয়ের জন্য Demo অ্যাকাউন্ট:</strong>
            </p>
            <p className="text-xs text-gray-600">
              📧 Email: admin@university.edu
              <br />
              🔒 Password: password123
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-6">
          © ২০২৬ বিশ্ববিদ্যালয় ব্যবস্থাপনা সিস্টেম
        </p>
      </div>
    </div>
  );
}
