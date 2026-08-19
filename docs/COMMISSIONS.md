# SELLIO — Motor de Comisiones y Modelo Económico (COMMISSIONS.md)

## 1. Reglas Económicas Fundamentales
1. **Comisión Comercial 100% Íntegra:** La comisión acordada con el comercial le pertenece en su totalidad. Sellio **nunca** descuenta su tarifa de la comisión del vendedor.
2. **Comisión de Sellio Separada:** Sellio cobra su tarifa a la empresa de forma independiente.
3. **Tope Máximo de Sellio (5%):** La comisión de Sellio está limitada por sistema a un máximo estricto del **5.0%**.
4. **Cálculo Backend Único:** Toda fórmula de comisiones se procesa a través del Commission Engine centralizado (`src/utils/commissionCalculator.js` / Supabase RPC).

## 2. Desglose Económico de una Venta
```text
SALE (Importe Bruto: 100 €)
 ├── Comisión Comercial (ej. 15%):     15.00 €  →  Para el Comercial (100% íntegro)
 ├── Tarifa Sellio (ej. 2%):            2.00 €  →  Para la Plataforma (Sellio Fee)
 └── Neto Empresa:                     83.00 €  →  Para la Empresa
```

## 3. Modelos de Comisión
- **Porcentaje por Venta:** Tasa porcentual fija sobre el importe de la venta.
- **Importe Fijo por Unidad:** Cantidad monetaria fija por unidad vendida.
- **Escalonado por Volumen (Volume Tiered):**
  - $0 - 5.000\text{ €} \rightarrow 3.0\%$
  - $5.001 - 15.000\text{ €} \rightarrow 2.5\%$
  - $15.001 - 30.000\text{ €} \rightarrow 2.0\%$
  - $30.001 - 50.000\text{ €} \rightarrow 1.5\%$
  - $+50.000\text{ €} \rightarrow 1.0\%$
