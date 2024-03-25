// Zustand 기본 사용 구조
import { create } from "zustand";

// 타입 지정
type State = {
  count: number;
  increase: () => void;
  decrease: () => void;
};

// 스테이트 동작 생성
export const useStore = create<State>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
}));
