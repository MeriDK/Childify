from django.db import models
from django.contrib.auth.models import  BaseUserManager
from hashlib import blake2b
from hmac import compare_digest

class FamilyManager(BaseUserManager):

  def create_family(self, password):
    
    hashPassword = Family.sign(password)
    
    family = self.model(
      password = hashPassword
    )
    family.save(using=self._db)
    return family

class Family(models.Model):

  password = models.CharField(max_length=32)

  def sign(password):
    h = blake2b(digest_size=16, key=b'pseudorandomly generated server secret key')
    h.update(password.encode('utf-8'))
    return h.hexdigest().encode('utf-8')
   
  def verify(password, truePassword):
    return str(Family.sign(password)) == truePassword
     

  def __str__(self):
      return f'id: {self.id}, password: {self.password}'

  object = FamilyManager()
