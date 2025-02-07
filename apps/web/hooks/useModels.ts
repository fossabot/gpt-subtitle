import { ModelType } from "@/types/index";
import useSWR from "swr";

export function useModels() {
  async function getModels(): Promise<ModelType[]> {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/osrt/models`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return res.json();
  }

  const { data, error, isLoading } = useSWR(`/osrt/models`, () => getModels());
  return { data, error, isLoading };
}
