import React from "react";
import type { Product } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Tag } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium transition-colors group-hover:text-emerald-500">
            {product.name}
          </CardTitle>
          <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-500 dark:text-zinc-400">
            <Tag className="h-3 w-3" />
            <span>{product.sku}</span>
          </div>
        </div>
        <Badge variant={product.status === "active" ? "success" : "secondary"}>
          {product.status}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Rp {product.price.toLocaleString("id-ID")}
          </span>
          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <Package className="h-3.5 w-3.5" />
            <span>Stok: {product.stock}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
