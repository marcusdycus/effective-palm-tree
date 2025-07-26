"use client";

import { useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import { Button } from "@/components/ui/button";
import { storePlaidItem } from "@/app/storePlaid/actions";

export function PlaidConnectBankLink() {
  const [linkToken, setLinkToken] = useState<string | null>(null);

  useEffect(() => {
    const createLinkToken = async () => {
      const res = await fetch("/api/plaid/create-link-token");
      const data = await res.json();
      setLinkToken(data.link_token);
    };
    createLinkToken();
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken!,

    onSuccess: async (public_token, metadata) => {
      const res = await fetch("/api/plaid/exchange-public-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_token }),
      });

      const { accessToken, itemId } = await res.json();

      await storePlaidItem({
        access_token: accessToken,
        item_id: itemId,
        institution_name: metadata.institution?.name ?? null,
      });
    },
  });

  return (
    <Button
      onClick={() => open()}
      disabled={!ready}
      className="px-4 py-2 max-w-52 font-semibold text-sm text-primary rounded-md hover:cursor-pointer bg-white text-black border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Connect Bank
    </Button>
  );
}
