from rest_framework import serializers
from .models import FavoriteGift

class FavoriteGiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteGift
        fields = ['gift_name', 'gift_price', 'gift_image_url', 'gift_url']
