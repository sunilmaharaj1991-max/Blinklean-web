import os
import re

def check_images():
    react_dir = r"c:\Users\jeevithgowdasr\blinklean-react"
    pages_dir = os.path.join(react_dir, "src", "pages")
    public_dir = os.path.join(react_dir, "public")
    
    missing_images = set()
    total_images_checked = 0

    image_pattern = re.compile(r'<img[^>]+src=["\']([^"\']+)["\']', re.IGNORECASE)

    for root, _, files in os.walk(pages_dir):
        for file in files:
            if not file.endswith('.jsx'):
                continue
            
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            for match in image_pattern.finditer(content):
                img_src = match.group(1)
                
                # Skip external urls
                if img_src.startswith('http://') or img_src.startswith('https://') or img_src.startswith('data:'):
                    continue
                
                # The image src will be relative to public, usually e.g. "assets/images/logo.png" or "/assets/images/..."
                
                # remove leading slash if any
                clean_src = img_src.lstrip('/')
                
                img_path = os.path.join(public_dir, clean_src)
                
                total_images_checked += 1
                if not os.path.exists(img_path):
                    missing_images.add(img_src)
                    print(f"Missing image found in {file}: {img_src}")

    if missing_images:
        print(f"\nTotal missing images: {len(missing_images)}")
    else:
        print(f"\nAll good! Checked {total_images_checked} local image references. No missing images found.")

if __name__ == "__main__":
    check_images()
