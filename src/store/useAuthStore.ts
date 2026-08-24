import { create } from 'zustand';
interface AuthState {
token: string | null;
login: (token: string) => void;
logout: () => void;
}
export const useAuthStore = create<AuthState>((set) => ({
// Cek apakah ada token di localStorage saat web pertama kali dibuka
token: localStorage.getItem('token') || null,
login: (newToken) => {
localStorage.setItem('token', newToken); // Simpan ke memori browser
set({ token: newToken }); // Simpan ke state React
},
logout: () => {
localStorage.removeItem('token');
set({ token: null });

}
}));