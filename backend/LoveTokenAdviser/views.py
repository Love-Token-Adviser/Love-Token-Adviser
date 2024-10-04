from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests
from django.http import JsonResponse
from django.conf import settings


@api_view(['GET'])
def test_api(request):
    return Response({"message": "Hello from Django!"})


def recommend_gift(request):
    # パートナーの性別と価格範囲を取得
    partner = request.GET.get('gender')
    age_range = request.GET.get('age')  # 例: 20s
    min_price = request.GET.get('min_price')  # デフォルト値: 1000
    max_price = request.GET.get('max_price')  # デフォルト値: 5000

    # 性別に応じてキーワードを変更
    if partner == '1':  # 女性
        gift_for = '女性向けギフト'
    elif partner == '0':  # 男性
        gift_for = '男性向けギフト'
    else:
        gift_for = 'ギフト'  # デフォルト値

    # 年齢が指定されていない場合はデフォルト値
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
        "keyword": f"{gift_for} {age_range}",
        "minPrice": min_price,
        "maxPrice": max_price,
        "sort": "standard",
        "hits": 30,  # 最大取得件数
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
