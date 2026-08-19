# SELLIO — COMISIONES EN OFERTAS DE PRODUCTO

## 1. Objetivo

Añadir a cada oferta comercial de producto un modelo de remuneración transparente que separe completamente:

1. **Comisión del comercial/promotor**: la fija la empresa y pertenece íntegramente al comercial.
2. **Comisión de Sellio**: la cobra Sellio directamente a la empresa y nunca se descuenta de la comisión del comercial.

La comisión de Sellio tendrá un límite funcional del **5% máximo**.

---

## 2. Regla económica principal

Ejemplo con producto de 100 €:

- Comisión comercial definida por empresa: 15% → 15 € para el comercial.
- Comisión Sellio: 2% → 2 € para Sellio.
- La comisión del comercial no se reduce por la comisión de Sellio.

La interfaz debe mostrar ambas cantidades por separado para evitar cualquier confusión.

---

## 3. Campos que debe incorporar una oferta de producto

### Información comercial

- `product_price`
- `currency`
- `commission_type`: `percentage` | `fixed_amount`
- `commercial_commission_rate`
- `commercial_commission_amount`
- `commercial_commission_basis`: `sale_value` | `net_sale` | `other`
- `commission_notes`

### Comisión Sellio

- `sellio_commission_type`: `percentage`
- `sellio_commission_rate`
- `sellio_commission_cap`: 5%
- `sellio_commission_model`: `fixed` | `volume_tiered`

### Condiciones

- `minimum_sale_value`
- `commission_payment_trigger`: `paid_sale` | `confirmed_sale` | `other`
- `payment_period`
- `returns_policy`
- `active_from`
- `active_until`

---

## 4. Componente funcional: OfferCommissionForm

Debe aparecer dentro del formulario de creación/edición de una oferta.

### Secciones UI

**A. Comisión del comercial**

- Selector porcentaje / importe fijo.
- Campo de porcentaje o importe.
- Vista previa del dinero que recibirá el comercial.
- Texto visible: **"Esta comisión pertenece íntegramente al comercial. Sellio no la descuenta."**

**B. Comisión Sellio**

- Selector de modelo: fija / escalonada por volumen.
- Porcentaje configurable entre 0% y 5%.
- Bloque informativo: **"La comisión de Sellio se cobra a la empresa y es independiente de la comisión del comercial."**
- Validación que impida superar el 5%.

**C. Vista previa**

Para un producto de 100 €:

```text
Precio del producto             100,00 €
Comisión comercial (15%)         15,00 €
Comisión Sellio (2%)              2,00 €
-----------------------------------------
Comercial recibe                  15,00 €
Sellio recibe                      2,00 €
Empresa recibe                    83,00 €*

* Antes de otros costes/impuestos aplicables.
```

---

## 5. Componente funcional: CommissionPreview

Componente reutilizable para mostrar el cálculo en:

- formulario de oferta;
- detalle de producto;
- marketplace;
- confirmación antes de publicar;
- dashboard de empresa;
- dashboard del comercial.

Debe recalcularse inmediatamente cuando cambien precio o porcentajes.

Nunca debe utilizar cálculos diferentes según la pantalla. El cálculo debe centralizarse en una utilidad/servicio común.

---

## 6. Componente funcional: VolumeCommissionTiers

Permite a la empresa crear una comisión Sellio progresiva por volumen.

Ejemplo inicial configurable:

| Volumen mensual | Sellio |
|---:|---:|
| 0–5.000 € | 3% |
| 5.001–15.000 € | 2,5% |
| 15.001–30.000 € | 2% |
| 30.001–50.000 € | 1,5% |
| +50.000 € | 1% |

Reglas:

- Nunca puede existir un tramo superior al 5%.
- Los tramos deben ser ordenados.
- No puede haber solapamientos.
- El sistema debe validar que todos los tramos tengan una comisión válida.
- La empresa debe poder guardar el modelo antes de publicar la oferta.

---

## 7. Componente funcional: CommissionCalculator

Crear una utilidad centralizada, por ejemplo:

```text
src/utils/commissionCalculator.js
```

Responsabilidades:

- calcular comisión comercial;
- calcular comisión Sellio;
- aplicar límite máximo de Sellio;
- determinar tramo de volumen;
- devolver desglose completo;
- redondear importes monetarios de forma consistente.

Salida conceptual:

```js
{
  saleValue,
  commercialCommission,
  sellioCommission,
  companyNetBeforeOtherCosts,
  sellioRateApplied,
  commercialRateApplied
}
```

---

## 8. Componente funcional: CommissionBadge

En las tarjetas de producto/oportunidad debe poder aparecer un resumen:

```text
COMISIÓN COMERCIAL
15%

COMISIÓN SELLIO
2%
```

Nunca mostrar "17% de comisión" porque mezclaría dos conceptos diferentes.

---

## 9. Componente funcional: CommissionBreakdown

En el detalle de una oferta:

```text
PRECIO DE VENTA
100 €

TU COMISIÓN COMO COMERCIAL
15 €

COMISIÓN SELLIO
2 €

La comisión del comercial es independiente de la comisión de Sellio.
```

Para la empresa, el mismo componente debe poder mostrar:

```text
Venta                         100 €
Comisión comercial            -15 €
Comisión Sellio                 -2 €
Resultado antes de otros costes 83 €
```

---

## 10. Flujo de publicación

```text
EMPRESA CREA PRODUCTO
        ↓
CREA / EDITA OFERTA
        ↓
DEFINE COMISIÓN COMERCIAL
        ↓
DEFINE COMISIÓN SELLIO
        ↓
SISTEMA VALIDA MÁXIMO 5%
        ↓
PREVISUALIZA EJEMPLO
        ↓
EMPRESA CONFIRMA
        ↓
PUBLICA OFERTA
```

Antes de publicar, debe existir una pantalla de confirmación con el desglose económico.

---

## 11. Flujo del comercial

El comercial debe poder conocer las condiciones antes de mostrar interés:

```text
DESCUBRE PRODUCTO
        ↓
VE PRECIO
        ↓
VE COMISIÓN QUE RECIBIRÁ
        ↓
VE CONDICIONES DE PAGO
        ↓
VE INFORMACIÓN DE SELLIO
        ↓
[ME INTERESA]
```

La comisión del comercial debe ser una de las informaciones más visibles de la oferta.

---

## 12. Eventos y estados

Una futura transacción deberá poder pasar por:

```text
lead
→ interested
→ contacted
→ negotiation
→ agreement
→ sale_pending
→ sale_confirmed
→ commission_pending
→ commission_paid
→ cancelled
```

La comisión no debe considerarse ganada definitivamente hasta que se cumpla el evento de pago definido por la oferta.

---

## 13. Dashboard de empresa

Añadir un módulo **Comisiones** con:

- ventas generadas;
- comisión comercial acumulada;
- comisión Sellio acumulada;
- comisión Sellio del periodo;
- modelo actual;
- tramos de volumen;
- histórico de transacciones;
- exportación futura.

---

## 14. Dashboard de comercial

Añadir un módulo **Mis comisiones** con:

- ventas realizadas;
- comisión pendiente;
- comisión confirmada;
- comisión pagada;
- histórico;
- producto;
- empresa;
- fecha;
- porcentaje acordado;
- importe ganado.

El comercial no necesita ver cuánto cobra Sellio, salvo que la política de transparencia del producto lo decida explícitamente. Sí debe ver siempre su propia comisión completa.

---

## 15. Reglas de seguridad y backend

La comisión configurada por una empresa no debe poder modificarse libremente después de una venta confirmada.

Guardar en la transacción una **copia inmutable de las condiciones aplicadas**:

- precio de venta;
- comisión comercial;
- comisión Sellio;
- porcentaje aplicado;
- tramo de volumen aplicado;
- fecha de cálculo.

Esto evita que cambiar posteriormente una oferta altere el histórico.

En Supabase, estas reglas deben protegerse mediante RLS y validaciones server-side. No confiar únicamente en React.

---

## 16. Arquitectura frontend propuesta

```text
src/
├── components/
│   └── commissions/
│       ├── CommissionPreview.jsx
│       ├── CommissionBreakdown.jsx
│       ├── CommissionBadge.jsx
│       ├── OfferCommissionForm.jsx
│       └── VolumeCommissionTiers.jsx
│
├── utils/
│   └── commissionCalculator.js
│
└── services/
    └── commissionService.js
```

El servicio debe encargarse de la comunicación con Supabase cuando el backend esté conectado.

---

## 17. Reglas que nunca deben romperse

1. La comisión del comercial pertenece íntegramente al comercial.
2. Sellio nunca descuenta su comisión de la comisión del comercial.
3. La comisión de Sellio es adicional y la paga la empresa.
4. La comisión de Sellio nunca puede superar el 5%.
5. La interfaz debe mostrar las dos comisiones separadamente.
6. Los cálculos deben estar centralizados.
7. Las condiciones aplicadas a una venta deben quedar registradas.
8. El cambio de una oferta no debe alterar transacciones históricas.
9. El comercial debe conocer su comisión antes de mostrar interés.
10. La empresa debe ver claramente cuánto paga al comercial y cuánto paga a Sellio.
