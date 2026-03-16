import os

files = [
    r"c:\Users\jeevithgowdasr\blinklean-react\src\pages\HomeCleaning.jsx",
    r"c:\Users\jeevithgowdasr\blinklean-react\src\pages\LaundryServices.jsx",
    r"c:\Users\jeevithgowdasr\blinklean-react\src\pages\Faq.jsx",
    r"c:\Users\jeevithgowdasr\blinklean-react\src\pages\ServiceDetails.jsx",
    r"c:\Users\jeevithgowdasr\blinklean-react\src\pages\ScrapBooking.jsx",
    r"c:\Users\jeevithgowdasr\blinklean-react\src\pages\Bookings.jsx"
]

replacements = {
    'src="assets/images/': 'src="/assets/images/',
    'src=\"assets/images/': 'src=\"/assets/images/',
    'img: \'assets/images/': 'img: \'/assets/images/',
    'bike_detailing.png': 'bike_detailing_kit.png',
    'bike_wash.png': 'motorbike_wash.png'
}

for file_path in files:
    if not os.path.exists(file_path):
        print(f"Skipping {file_path}")
        continue
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements.items():
        content = content.replace(old, new)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Fixed {file_path}")
