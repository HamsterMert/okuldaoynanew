import React, { useState, useEffect } from 'react';
import { Lock, Trash2, Plus, Edit2 } from 'lucide-react';
import Footer from '../components/Footer';

const ADMIN_PASSWORD = 'admin123';

const CATEGORIES = [
  { value: 'others', label: 'Diğer' },
  { value: 'car', label: 'Araba Oyunları' },
  { value: 'two-player', label: '2 Kişilik Oyunlar' },
  { value: 'realistic', label: 'Gerçekçi Oyunlar' },
  { value: 'platform', label: 'Platform Oyunları' },
];

interface Game {
  id: string;
  title: string;
  description: string;
  category: string;
  subject: string;
  thumbnail: string;
  gameUrl: string;
  teacherRecommended: boolean;
  _id?: string; // MongoDB belge ID'si
}

const Admin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [games, setGames] = useState<Game[]>([]);
  const [newGame, setNewGame] = useState({
    id: '',
    title: '',
    description: '',
    category: '',
    subject: '',
    thumbnail: '',
    gameUrl: '',
    teacherRecommended: false,
  });
  const [editGame, setEditGame] = useState<Game | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Oyunları API'den yükle
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('/api/games');
        if (!response.ok) throw new Error('Oyunlar yüklenemedi.');
        const data = await response.json();
        setGames(data);
      } catch {
        setFormError('Oyunlar yüklenirken hata oluştu.');
      }
    };
    fetchGames();
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError(null);
    } else {
      setError('Geçersiz şifre. Lütfen tekrar deneyin.');
      setPassword('');
    }
  };

  const handleAddGame = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newGame.id ||
      !newGame.title ||
      !newGame.description ||
      !newGame.category ||
      !newGame.subject ||
      !newGame.thumbnail ||
      !newGame.gameUrl
    ) {
      setFormError('Lütfen tüm zorunlu alanları doldurun.');
      return;
    }

    try {
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGame),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Oyun eklenemedi.');
      }
      const addedGame = await response.json();
      setGames([...games, addedGame]);
      setNewGame({
        id: '',
        title: '',
        description: '',
        category: '',
        subject: '',
        thumbnail: '',
        gameUrl: '',
        teacherRecommended: false,
      });
      setFormError(null);
      setSuccess('Oyun başarıyla eklendi!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (e: any) {
      setFormError(e.message);
    }
  };

  const handleEditGame = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editGame || !editGame._id) return;

    if (
      !editGame.id ||
      !editGame.title ||
      !editGame.description ||
      !editGame.category ||
      !editGame.subject ||
      !editGame.thumbnail ||
      !editGame.gameUrl
    ) {
      setFormError('Lütfen tüm zorunlu alanları doldurun.');
      return;
    }

    try {
      const response = await fetch('/api/games', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editGame),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Oyun güncellenemedi.');
      }
      setGames(
        games.map((game) => (game._id === editGame._id ? { ...editGame } : game))
      );
      setEditGame(null);
      setFormError(null);
      setSuccess('Oyun başarıyla güncellendi!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (e: any) {
      setFormError(e.message);
    }
  };

  const handleDeleteGame = async (id: string, _id?: string) => {
    if (window.confirm('Bu oyunu silmek istediğinizden emin misiniz?') && _id) {
      try {
        const response = await fetch(`/api/games?_id=${_id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Oyun silinemedi.');
        }
        setGames(games.filter((game) => game._id !== _id));
        if (editGame?._id === _id) setEditGame(null);
        setSuccess('Oyun başarıyla silindi!');
        setTimeout(() => setSuccess(null), 3000);
      } catch (e: any) {
        setFormError(e.message);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center animate-slide-up">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Girişi</h1>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                  placeholder="Şifreyi girin"
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                  aria-label="Admin Şifresi"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" aria-hidden="true" />
              </div>
              {error && (
                <p className="text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-lg shadow-lg hover:shadow-xl hover:bg-indigo-700 transition-all duration-300"
                aria-label="Giriş Yap"
              >
                Giriş Yap
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto animate-slide-up">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Admin Paneli</h1>
          <p className="text-lg text-gray-600 mb-8">
            Oyunları ekleyin, düzenleyin veya kaldırın. Değişiklikler tüm kullanıcılar için geçerlidir.
          </p>

          {success && (
            <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg animate-slide-up" role="alert">
              {success}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {editGame ? 'Oyun Düzenle' : 'Yeni Oyun Ekle'}
            </h2>
            <form onSubmit={editGame ? handleEditGame : handleAddGame} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                    Oyun ID
                  </label>
                  <input
                    id="id"
                    type="text"
                    value={editGame ? editGame.id : newGame.id}
                    onChange={(e) =>
                      editGame
                        ? setEditGame({ ...editGame, id: e.target.value })
                        : setNewGame({ ...newGame, id: e.target.value })
                    }
                    placeholder="Örn: 20"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Oyun ID"
                    disabled={!!editGame}
                  />
                </div>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Başlık
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={editGame ? editGame.title : newGame.title}
                    onChange={(e) =>
                      editGame
                        ? setEditGame({ ...editGame, title: e.target.value })
                        : setNewGame({ ...newGame, title: e.target.value })
                    }
                    placeholder="Örn: Clash Royale"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Oyun Başlığı"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Açıklama
                  </label>
                  <input
                    id="description"
                    type="text"
                    value={editGame ? editGame.description : newGame.description}
                    onChange={(e) =>
                      editGame
                        ? setEditGame({ ...editGame, description: e.target.value })
                        : setNewGame({ ...newGame, description: e.target.value })
                    }
                    placeholder="Örn: Supercell"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Oyun Açıklaması"
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Kategori
                  </label>
                  <select
                    id="category"
                    value={editGame ? editGame.category : newGame.category}
                    onChange={(e) =>
                      editGame
                        ? setEditGame({ ...editGame, category: e.target.value })
                        : setNewGame({ ...newGame, category: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Oyun Kategorisi"
                  >
                    <option value="">Kategori Seçin</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Konu
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={editGame ? editGame.subject : newGame.subject}
                    onChange={(e) =>
                      editGame
                        ? setEditGame({ ...editGame, subject: e.target.value })
                        : setNewGame({ ...newGame, subject: e.target.value })
                    }
                    placeholder="Örn: others"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Oyun Konusu"
                  />
                </div>
                <div>
                  <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
                    Küçük Resim URL
                  </label>
                  <input
                    id="thumbnail"
                    type="text"
                    value={editGame ? editGame.thumbnail : newGame.thumbnail}
                    onChange={(e) =>
                      editGame
                        ? setEditGame({ ...editGame, thumbnail: e.target.value })
                        : setNewGame({ ...newGame, thumbnail: e.target.value })
                    }
                    placeholder="Örn: /images/logo.png"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Küçük Resim URL"
                  />
                </div>
                <div>
                  <label htmlFor="gameUrl" className="block text-sm font-medium text-gray-700">
                    Oyun URL
                  </label>
                  <input
                    id="gameUrl"
                    type="text"
                    value={editGame ? editGame.gameUrl : newGame.gameUrl}
                    onChange={(e) =>
                      editGame
                        ? setEditGame({ ...editGame, gameUrl: e.target.value })
                        : setNewGame({ ...newGame, gameUrl: e.target.value })
                    }
                    placeholder="Örn: https://turbowarp.org/..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Oyun URL"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    id="teacherRecommended"
                    type="checkbox"
                    checked={editGame ? editGame.teacherRecommended : newGame.teacherRecommended}
                    onChange={(e) =>
                      editGame
                        ? setEditGame({ ...editGame, teacherRecommended: e.target.checked })
                        : setNewGame({ ...newGame, teacherRecommended: e.target.checked })
                    }
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    aria-label="Öğretmen Önerisi"
                  />
                  <label htmlFor="teacherRecommended" className="ml-2 text-sm font-medium text-gray-700">
                    Öğretmen Önerisi
                  </label>
                </div>
              </div>
              {formError && (
                <p className="text-sm text-red-600" role="alert">
                  {formError}
                </p>
              )}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-lg shadow-lg hover:shadow-xl hover:bg-indigo-700 transition-all duration-300"
                  aria-label={editGame ? 'Oyun Kaydet' : 'Oyun Ekle'}
                >
                  {editGame ? (
                    <>
                      <Edit2 className="h-5 w-5 mr-2" aria-hidden="true" />
                      Kaydet
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5 mr-2" aria-hidden="true" />
                      Oyun Ekle
                    </>
                  )}
                </button>
                {editGame && (
                  <button
                    type="button"
                    onClick={() => setEditGame(null)}
                    className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition-all duration-300"
                    aria-label="İptal"
                  >
                    İptal
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Mevcut Oyunlar</h2>
            {games.length === 0 ? (
              <p className="text-gray-600">Henüz oyun eklenmedi.</p>
            ) : (
              <div className="space-y-4">
                {games.map((game) => (
                  <div
                    key={game._id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={game.thumbnail}
                        alt={`${game.title} küçük resmi`}
                        className="w-16 h-16 object-cover rounded-lg"
                        onError={(e) => (e.currentTarget.src = '/images/fallback.png')}
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{game.title}</h3>
                        <p className="text-sm text-gray-600">{game.description}</p>
                        <p className="text-sm text-gray-500">
                          Kategori: {CATEGORIES.find((cat) => cat.value === game.category)?.label || game.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditGame(game)}
                        className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
                        aria-label={`${game.title} oyununu düzenle`}
                      >
                        <Edit2 className="h-5 w-5" aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => handleDeleteGame(game.id, game._id)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors duration-200"
                        aria-label={`${game.title} oyununu sil`}
                      >
                        <Trash2 className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;