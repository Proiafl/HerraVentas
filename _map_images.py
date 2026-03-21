
import os
import re
import shutil

src_dir = r"C:\Users\Administrator\Projects\HerraVentas\public\productos fotos"
dest_dir = r"C:\Users\Administrator\Projects\HerraVentas\public\images\products"
os.makedirs(dest_dir, exist_ok=True)

# Mapeo modelo -> product id (nombre de archivo en imagenUrl)
mapeo = {
    "Bosch_GSS140":        "lijadora-orbital-bosch-gss140-220w",
    "Bosch_GWS700_710W":   "amoladora-angular-bosch-gws700-de-710w-g3tli",
    "DeWalt_DWE496-AR":    "amoladora-angular-dewalt-dwe496",
    "Skil_7232":           "lijadora-orbital-profesional-carpinteria-skil-7232-200w",
    "Skil_9004":           "amoladora-de-mano-profesional-skil-9004-830w",
    "Total_TAGLI27153":    "amoladora-angular-20v-brushless-115mm-total",
    "Total_TDLI205581":    "taladro-inalambrico-20v-brushless-total",
    "Total_TDLI206021":    "taladro-atornillador-inalambrico-20v-total",
    "Total_TF1301836-4":   "lijadora-orbital-320w-total",
    "Total_TFALI2007":     "ventilador-portatil-20v-total",
    "Total_TG10711576":    "amoladora-angular-710w-115mm-total",
    "Total_TG1071366-4":   "taladro-percutor-710w-13mm-total",
    "Total_TG110125565-4": "amoladora-angular-1100w-125mm-total",
    "Total_TG111136-4":    "taladro-percutor-1010w-13mm-total",
    "Total_TGT11316-4":    "hidrolavadora-electrica-1400w-total",
    "Total_TH306236-4":    "rotomartillo-sds-plus-650w-total",
    "Total_THKITH1601":    "caja-herramientas-aisladas-16pcs-total",
    "Total_THKTHP21396":   "caja-herramientas-139pcs-total",
    "Total_THKTHP21686-4": "caja-herramientas-manuales-168pcs-total",
    "Total_THKTHP90097":   "estuche-herramientas-9pcs-total",
    "Total_THSPP30502":    "pulverizador-presion-5l-total",
    "Total_THT10701":      "caja-metalica-3pisos-total",
    "Total_THT141253":     "set-llaves-bocallaves-24pcs-total",
    "Total_THT141462":     "set-llaves-bocallaves-46pcs-total",
    "Total_THT280806":     "pico-de-loro-200mm-total",
    "Total_THTK1013":      "set-llaves-ajustables-3pcs-total",
    "Total_TIDLI205581":   "taladro-percutor-inalambrico-20v-total",
    "Total_TIDLI206681":   "taladro-percutor-20v-brushless-total",
    "Total_TIWLI20401":    "llave-impacto-20v-brushless-total",
    "Total_TS11218576-4":  "sierra-circular-1200w-total",
    "Total_TS206656-4":    "sierra-caladora-570w-total",
    "Total_TVLI201261":    "aspiradora-mano-inalambrica-20v-total",
}

# Parsear archivos: encontrar cual es la imagen _1 (o menor numero) de cada modelo
# Patron: <modelo>_<N>[( N)].ext
best = {}  # modelo -> (num, filepath)

for fname in os.listdir(src_dir):
    fpath = os.path.join(src_dir, fname)
    name, ext = os.path.splitext(fname)
    name_stripped = name.strip()
    
    # Buscar patron _N o _N (M) al final
    m = re.match(r'^(.+?)_(\d+)(\s*\(\d+\))?$', name_stripped)
    if not m:
        print(f"  [skip] no match: {fname}")
        continue
    
    modelo = m.group(1).strip()
    num = int(m.group(2))
    
    if modelo not in mapeo:
        print(f"  [sin mapeo] {modelo}")
        continue
    
    if modelo not in best or num < best[modelo][0]:
        best[modelo] = (num, fpath, ext)

# Copiar la imagen _1 de cada modelo con el nombre del producto
print("\n=== COPIANDO IMAGENES PRINCIPALES ===")
copied = 0
for modelo, (num, fpath, ext) in sorted(best.items()):
    product_id = mapeo[modelo]
    dest_name = f"{product_id}{ext}"
    dest_path = os.path.join(dest_dir, dest_name)
    shutil.copy2(fpath, dest_path)
    print(f"  ✅ {os.path.basename(fpath)} -> images/products/{dest_name}")
    copied += 1

print(f"\n📦 Total: {copied} imágenes copiadas")

# Verificar cuales productos del ts no tienen imagen
print("\n=== PRODUCTOS SIN IMAGEN ===")
ids_en_mapeo = set(mapeo.values())
# Chequear que el producto tiene imagen
for product_id in sorted(ids_en_mapeo):
    found = any(
        f.startswith(product_id) 
        for f in os.listdir(dest_dir)
    )
    if not found:
        print(f"  ❌ SIN IMAGEN: {product_id}")
print("  (si no aparece nada, todos tienen imagen)")
