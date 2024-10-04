from django.db import models
from django.conf import settings

class FavoriteGift(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    gift_name = models.CharField(max_length=255)
    gift_price = models.DecimalField(max_digits=10, decimal_places=2)
    gift_image_url = models.URLField()
    gift_url = models.URLField()

    def __str__(self):
        return f"{self.gift_name} - {self.user.username}"
