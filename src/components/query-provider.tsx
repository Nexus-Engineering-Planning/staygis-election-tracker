"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/constants";

type Props = {
  children: React.ReactNode;
};

const QueryProvider = ({ children }: Props) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}


export default QueryProvider