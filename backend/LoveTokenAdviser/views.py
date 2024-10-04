from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests
from django.http import JsonResponse
from django.conf import settings
from .models import FavoriteGift
from .serializers import FavoriteGiftSerializer


@api_view(['GET'])
def test_api(request):
    return Response({"message": "Hello from Django!"})


def recommend_gift(request):
    partner = request.GET.get('gender')
    age_range = request.GET.get('age')  # 例: 20s
    min_price = request.GET.get('min_price')  # デフォルト値: 1000
    max_price = request.GET.get('max_price')  # デフォルト値: 5000

    # 性別に応じてキーワードを変更
    if partner == '0':
        gift_for = '彼氏 プレゼント'
    elif partner == '1':
        gift_for = '彼女 プレゼント'
    else:
        gift_for = 'プレゼント'

    if not age_range:
        age_range = '20代'
    else:
        age_range = age_range + '代'

    if not min_price:
        min_price = 1000
    
    if not max_price:
        max_price = 5000

    search_keyword = f"{gift_for} {age_range}"

    url = "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601"
    params = {
        "applicationId": settings.RAKUTEN_APP_ID,
        "keyword": search_keyword,
        "minPrice": min_price,
        "maxPrice": max_price,
        "sort": "standard",
        "hits": 30,
    }

    response = requests.get(url, params=params)

    try:
        data = response.json()
        # レスポンスに 'Items' キーがあるか確認
        if 'Items' not in data:
            return JsonResponse({"error": "Rakuten API returned an invalid response"}, status=500)
        
        products = []
        for item in data['Items']:
            product = {
                "Name": item['Item']['itemName'],
                "Price": item['Item']['itemPrice'],
                "image": item['Item']['mediumImageUrls'][0]['imageUrl'],
                "URL": item['Item']['itemUrl'],
            }
            products.append(product)

        return JsonResponse(products, safe=False)

    except ValueError:
        return JsonResponse({"error": "Invalid response from Rakuten API"}, status=500)
      

def recommend_outfit(request):
    # パートナーの性別と価格範囲を取得
    gender = request.GET.get('gender')
    age_range = request.GET.get('age')  # 例: 20s
    min_price = request.GET.get('min_price')  # デフォルト値: 1000
    max_price = request.GET.get('max_price')  # デフォルト値: 5000

    # 性別に応じてキーワードを変更
    if gender == '0':
        outfit_for = '男性ファッション'
    elif gender == '1':
        outfit_for = '女性ファッション'
    else:
        outfit_for = 'ファッション'  # デフォルト値
        
    if not age_range:
        age_range = "20代"  # デフォルトは20代
    
    if not min_price:
        min_price = 1000
    
    if not max_price:
        max_price = 5000
        
    # Rakuten APIへのリクエスト
    url = "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601"
    params = {
        "applicationId": settings.RAKUTEN_APP_ID,
        "keyword": f"{outfit_for} {age_range}",
        "minPrice": min_price,
        "maxPrice": max_price,
        "sort": "standard",
        "hits": 30,
    }

    response = requests.get(url, params=params)
    
    # レスポンスが正しいか確認
    try:
        data = response.json()
    except ValueError:
        return JsonResponse({"error": "Invalid response from Rakuten API"}, status=500)
    
    # 必要なデータを整形し、Unicodeエスケープをデコード
    products = []
    for item in data['Items']:
        product = {
            "Name": item['Item']['itemName'],  # Unicodeエスケープされた日本語をそのまま利用
            "Price": item['Item']['itemPrice'],
            "image": item['Item']['mediumImageUrls'][0]['imageUrl'],
            "URL": item['Item']['itemUrl'],
        }
        # Unicodeエスケープされた文字列をPythonの内部で日本語に変換
        products.append(product)

    # productsを直接JsonResponseに渡す
    return JsonResponse(products, safe=False)

@api_view(['POST'])
def add_to_favorites(request):
    # user = request.user
    # if not user.is_authenticated:
    #     return JsonResponse({"error": "User must be logged in to add favorites"}, status=400)
    
    # POSTデータから商品情報を取得
    gift_data = {
        "gift_name": request.data.get('gift_name'),
        "gift_price": request.data.get('gift_price'),
        "gift_image_url": request.data.get('gift_image_url'),
        "gift_url": request.data.get('gift_url'),
    }

    # FavoriteGiftに追加
    serializer = FavoriteGiftSerializer(data=gift_data)
    if serializer.is_valid():
        serializer.save(user=user)
        return JsonResponse({"message": "Gift added to favorites!"}, status=201)
    
    return JsonResponse(serializer.errors, status=400)
