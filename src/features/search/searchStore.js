import { create } from "zustand";
import { getDoctors } from "../../services/api/apiDoctors";
import { getArticles } from "../../services/api/apiArticles";

export const useSearchStore = create((set, get) => ({
  query: "",
  open: false,
  loading: false,
  doctors: [],
  articles: [],
  filteredDoctors: [],
  filteredArticles: [],

  setQuery: (q) => {
    set({ query: q });

    if (!q.trim()) {
      set({ filteredDoctors: [], filteredArticles: [] });
      return;
    }

    const { doctors, articles } = get();
    const query = q.toLowerCase();

    const matchedDoctors = doctors.filter((doc) => {
      const fullName = `Dr. ${doc.firstName} ${doc.secondName}`.toLowerCase();
      return (
        fullName.includes(query) || doc.specialty.toLowerCase().includes(query)
      );
    });

    const matchedArticles = articles.filter((article) => {
      return (
        article.title.toLowerCase().includes(query) ||
        article.author?.toLowerCase().includes(query)
      );
    });

    set({
      filteredDoctors: matchedDoctors,
      filteredArticles: matchedArticles,
    });
  },

  setOpen: (val) => set({ open: val }),
  closeDropdown: () => set({ open: false }),

  loadData: async () => {
    const { doctors, articles } = get();
    if (doctors.length && articles.length) return;

    set({ loading: true });
    try {
      const [fetchedDoctors, fetchedArticles] = await Promise.all([
        getDoctors(),
        getArticles(),
      ]);
      set({ doctors: fetchedDoctors?.data, articles: fetchedArticles });
    } catch (err) {
      console.error("Search preload failed:", err);
    } finally {
      set({ loading: false });
    }
  },
}));
