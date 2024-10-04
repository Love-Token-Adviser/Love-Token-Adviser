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
    age_range = request.GET.get('age')
    min_price = request.GET.get('min_price')
    max_price = request.GET.get('max_price')
    user_keyword = request.GET.get('keyword')

    if partner == '1':
        gift_for = '彼女 プレゼント'
    elif partner == '0':
        gift_for = '男性向けギフト'
    else:
        gift_for = 'ギフト'

    if not age_range:
        age_range = '20代'
    else:
        age_range = age_range + '代'

    if not min_price:
        min_price = 1000
    
    if not max_price:
        max_price = 5000

    search_keyword = f"{gift_for} {age_range}"
    if user_keyword:
        search_keyword += f" {user_keyword}"

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
        logger.error(f"Invalid JSON response from Rakuten API: {response.text}")
        return JsonResponse({"error": "Invalid response from Rakuten API"}, status=500)


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
