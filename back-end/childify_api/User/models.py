from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionManager
import regex

class MyUserManager(BaseUserManager):
  def create_user(self, email, username, password, isParent):
    if not email:
      raise ValueError("User must have an email address")
    if not username:
      raise ValueError("User must have an username")
    if not password:
      raise ValueError("User must have an password")
    if isParent==None:
      raise ValueError("User must have an isParent")

    if len(username) < 6 :
      raise ValueError("username must be at least 6 characters")
    if len(password) < 8:
      raise ValueError("password must be at least 6 characters")

    if not regex.match("[^ @]*",username):
      raise ValueError("username must be valid")

    user = self.model(
      email = self.normalize_email(email),
      username = username,
      isParent = isParent
    )

    user.set_password(password)
    user.save(using=self._db)
    return user

  def create_superuser(self, username, password):
    user = self.create_user(
      email=self.normalize_email(username+"@admin.childify"),
      username=username,
      password = password,
      isParent= True
    )
    user.is_admin = True
    user.is_staff = True
    user.is_superuser = True
    user.save(using=self._db)
    return user



class User(AbstractBaseUser):
  user_id = models.AutoField(primary_key = True )
  username = models.CharField(max_length=30, unique=True)
  email = models.EmailField(verbose_name="email", max_length=60, unique= True)
  password = models.CharField(max_length=32)
  isParent = models.BooleanField()

  date_joined = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
  last_login = models.DateTimeField(verbose_name='last login',auto_now=True)
  is_admin = models.BooleanField(default=False)
  is_active = models.BooleanField(default=True)
  is_staff = models.BooleanField(default=False)
  is_superuser = models.BooleanField(default=False)

  USERNAME_FIELD ='username'
  EMAIL_FIELD = 'email'

  object = MyUserManager()
  objects = PermissionManager()

  def __str__(self):
    return self.username

  def has_perm(self, perm , obj=None):
    return self.is_admin

  def has_module_perms(self, app_label):
    return True

