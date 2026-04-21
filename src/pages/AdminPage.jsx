import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Axios import kiya

const CONTACT_API = 'https://veltex-v5.onrender.com/api/contact';
const AUTH_API = 'https://veltex-v5.onrender.com/api/auth/login';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return typeof window !== 'undefined' && localStorage.getItem('isVeltexAdmin') === 'true';
  });
  
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeTray, setActiveTray] = useState(null);
  const [filters, setFilters] = useState({ name: '', email: '', service: '', dateRange: '' });

  useEffect(() => {
    if (isAuthenticated) fetchData();
  }, [isAuthenticated]);

  // LOGIN VIA AXIOS
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    try {
      const response = await axios.post(AUTH_API, loginData);

      if (response.data.success) {
        localStorage.setItem('isVeltexAdmin', 'true');
        setIsAuthenticated(true);
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setLoginError(msg);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isVeltexAdmin');
    setIsAuthenticated(false);
    setSubmissions([]);
  };

  // FETCH DATA VIA AXIOS
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(CONTACT_API);
      if (response.data.success) setSubmissions(response.data.data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getOptions = (column) => {
    return [...new Set(submissions.map(item => item[column]))].filter(Boolean).sort();
  };

  const filteredSubmissions = submissions.filter(sub => {
    const subDate = new Date(sub.created_at);
    const today = new Date();
    let dateMatch = true;
    if (filters.dateRange === 'today') dateMatch = subDate.toDateString() === today.toDateString();
    else if (filters.dateRange === 'yesterday') {
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      dateMatch = subDate.toDateString() === yesterday.toDateString();
    } else if (filters.dateRange === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(today.getDate() - 7);
      dateMatch = subDate >= weekAgo;
    } else if (filters.dateRange === 'month') {
      dateMatch = subDate.getMonth() === today.getMonth() && subDate.getFullYear() === today.getFullYear();
    }

    return dateMatch &&
      (!filters.name || sub.name === filters.name) &&
      (!filters.email || sub.email === filters.email) &&
      (!filters.service || sub.service === filters.service);
  });

  useEffect(() => {
    const close = () => setActiveTray(null);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, []);

  const ColumnTray = ({ column, title, customOptions }) => (
    <div className="relative inline-block" onClick={(e) => e.stopPropagation()}>
      <button 
        onClick={() => setActiveTray(activeTray === column ? null : column)}
        className={`ml-2 p-1.5 rounded-lg transition-all ${filters[column] ? 'bg-[#0066cc] text-white' : 'text-gray-800 hover:text-gray-600'}`}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className={`transition-transform ${activeTray === column ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>
      {activeTray === column && (
        <div className="absolute left-0 mt-4 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 z-[100] py-2 animate-in fade-in zoom-in-95 duration-200">
          <div className="px-4 py-2 text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-1">Filter {title}</div>
          <button onClick={() => { setFilters({ ...filters, [column]: '' }); setActiveTray(null); }} className="w-full text-left px-4 py-2 text-xs hover:bg-gray-50 text-gray-600">All Time</button>
          {(customOptions || getOptions(column)).map(opt => {
             const label = typeof opt === 'object' ? opt.label : opt;
             const value = typeof opt === 'object' ? opt.value : opt;
             return (
              <button key={value} onClick={() => { setFilters({ ...filters, [column]: value }); setActiveTray(null); }} className={`w-full text-left px-4 py-2 text-xs hover:bg-blue-50 ${filters[column] === value ? 'text-[#0066cc] font-bold' : 'text-gray-500'}`}>{label}</button>
             );
          })}
        </div>
      )}
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white p-10 rounded-[2rem] shadow-xl border border-gray-100">
          <h2 className="font-serif text-3xl font-medium text-[#0f172a] text-center mb-8">Veltex Admin</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="text" required placeholder="Username" className="w-full bg-gray-50 rounded-xl px-5 py-4 text-sm outline-none border border-transparent focus:border-[#0066cc]" onChange={(e) => setLoginData({...loginData, username: e.target.value})} />
            <input type="password" required placeholder="Password" className="w-full bg-gray-50 rounded-xl px-5 py-4 text-sm outline-none border border-transparent focus:border-[#0066cc]" onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
            {loginError && <p className="text-red-500 text-xs text-center">{loginError}</p>}
            <button className="w-full bg-[#0f172a] text-white py-4 rounded-xl font-bold text-sm tracking-widest hover:bg-[#0066cc] transition-all">LOGIN</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-10 pb-10 px-[4vw]">
      <div className="max-w-7xl mx-auto space-y-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-[#0066cc] font-bold text-[0.6rem] uppercase tracking-[0.3em] mb-2">Private Control</p>
            <h1 className="font-serif text-4xl font-medium text-[#0f172a]">Veltex Inbox</h1>
          </div>
          <div className="flex items-center gap-4">
             {Object.values(filters).some(f => f !== '') && <button onClick={() => setFilters({ name: '', email: '', service: '', dateRange: '' })} className="text-[0.6rem] font-bold text-red-500 uppercase tracking-widest">Reset Filters</button>}
             <div className="bg-[#0f172a] text-white px-5 py-3 rounded-2xl flex items-center gap-5 shadow-lg">
               <span className="text-sm font-serif font-bold italic">{filteredSubmissions.length} Entries</span>
               <div className="h-4 w-px bg-white/20"></div>
               <button onClick={handleLogout} className="text-[0.65rem] font-black uppercase tracking-widest hover:text-red-400 transition-colors">Logout</button>
            </div>
          </div>
        </header>

        <div className="bg-white rounded-[2.8rem] shadow-sm border border-gray-50 overflow-hidden">
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#fcfdfe] border-b border-gray-50">
                  <th className="px-8 py-6"><div className="flex items-center text-[0.6rem] font-bold text-gray-800 uppercase tracking-widest">Date <ColumnTray column="dateRange" title="Date" customOptions={[{ label: 'Today', value: 'today' }, { label: 'Yesterday', value: 'yesterday' }, { label: 'Week', value: 'week' }, { label: 'Month', value: 'month' }]} /></div></th>
                  <th className="px-8 py-6"><div className="flex items-center text-[0.6rem] font-bold text-gray-800 uppercase tracking-widest">Client <ColumnTray column="name" title="Name" /></div></th>
                  <th className="px-8 py-6"><div className="flex items-center text-[0.6rem] font-bold text-gray-800 uppercase tracking-widest">Email <ColumnTray column="email" title="Email" /></div></th>
                  <th className="px-8 py-6"><div className="flex items-center text-[0.6rem] font-bold text-gray-800 uppercase tracking-widest">Service <ColumnTray column="service" title="Service" /></div></th>
                  <th className="px-8 py-6 text-[0.6rem] font-bold text-gray-800 uppercase tracking-widest">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr><td colSpan="5" className="py-20 text-center"><div className="inline-block animate-spin h-6 w-6 border-t-2 border-[#0066cc] rounded-full"></div></td></tr>
                ) : filteredSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-[#fcfdfe] transition-all group">
                    <td className="px-8 py-6 text-[0.6rem] font-bold text-gray-800 uppercase">{new Date(sub.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</td>
                    <td className="px-8 py-6 font-serif text-lg text-[#0f172a] group-hover:text-[#0066cc] transition-colors">{sub.name}</td>
                    <td className="px-8 py-6 text-sm text-gray-800 opacity-60">{sub.email}</td>
                    <td className="px-8 py-6"><span className="px-3 py-1 bg-gray-50 text-gray-800 rounded-lg text-[0.6rem] font-bold uppercase">{sub.service}</span></td>
                    <td className="px-8 py-6 max-w-sm italic text-xs text-gray-800 font-serif line-clamp-1 opacity-50">"{sub.message}"</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
