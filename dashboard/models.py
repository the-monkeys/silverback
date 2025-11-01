# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthProvider(models.Model):
    provider_name = models.CharField(unique=True, max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_provider'


class Blog(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey('UserAccount', models.DO_NOTHING)
    blog_id = models.CharField(unique=True, max_length=255)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'blog'


class BlogBookmarks(models.Model):
    user = models.ForeignKey('UserAccount', models.DO_NOTHING)
    blog = models.ForeignKey(Blog, models.DO_NOTHING)
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'blog_bookmarks'


class BlogComments(models.Model):
    comment_id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey('UserAccount', models.DO_NOTHING)
    blog = models.ForeignKey(Blog, models.DO_NOTHING)
    comment_text = models.TextField()
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'blog_comments'


class BlogLikes(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey('UserAccount', models.DO_NOTHING)
    blog = models.ForeignKey(Blog, models.DO_NOTHING)
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'blog_likes'
        unique_together = (('user', 'blog'),)


class BlogPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    blog = models.ForeignKey(Blog, models.DO_NOTHING)
    user = models.ForeignKey('UserAccount', models.DO_NOTHING)
    permission_type = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'blog_permissions'


class Clients(models.Model):
    c_name = models.CharField(unique=True, max_length=32, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'clients'


class CoAuthorActivityLog(models.Model):
    blog = models.ForeignKey(Blog, models.DO_NOTHING)
    co_author = models.ForeignKey('UserAccount', models.DO_NOTHING, blank=True, null=True)
    action = models.CharField(max_length=50)
    performed_by = models.ForeignKey('UserAccount', models.DO_NOTHING, db_column='performed_by', related_name='coauthoractivitylog_performed_by_set')
    action_timestamp = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'co_author_activity_log'


class CoAuthorInvites(models.Model):
    blog = models.ForeignKey(Blog, models.DO_NOTHING)
    inviter = models.ForeignKey('UserAccount', models.DO_NOTHING)
    invitee = models.ForeignKey('UserAccount', models.DO_NOTHING, related_name='coauthorinvites_invitee_set')
    invite_status = models.CharField(max_length=50)
    created_at = models.DateTimeField(blank=True, null=True)
    responded_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'co_author_invites'


class CoAuthorPermissions(models.Model):
    blog = models.ForeignKey(Blog, models.DO_NOTHING)
    co_author = models.ForeignKey('UserAccount', models.DO_NOTHING)
    role = models.ForeignKey('UserRole', models.DO_NOTHING)
    granted_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'co_author_permissions'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey('UserAccount', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class EmailTemplates(models.Model):
    template_name = models.CharField(max_length=100)
    subject = models.CharField(max_length=255)
    body = models.TextField()
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'email_templates'


class EmailValidationStatus(models.Model):
    status = models.CharField(unique=True, max_length=100)

    class Meta:
        managed = False
        db_table = 'email_validation_status'


class LoggedInDevices(models.Model):
    device_name = models.CharField(max_length=32, blank=True, null=True)
    ip_address = models.CharField(max_length=64, blank=True, null=True)
    operating_sys = models.CharField(max_length=32, blank=True, null=True)
    login_time = models.DateTimeField(blank=True, null=True)
    user = models.ForeignKey('UserAccount', models.DO_NOTHING)
    client = models.ForeignKey(Clients, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'logged_in_devices'


class NotificationChannel(models.Model):
    channel_name = models.CharField(unique=True, max_length=50)

    class Meta:
        managed = False
        db_table = 'notification_channel'


class NotificationType(models.Model):
    notification_name = models.CharField(unique=True, max_length=100)
    description = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'notification_type'


class Notifications(models.Model):
    user = models.ForeignKey('UserAccount', models.DO_NOTHING)
    notification_type = models.ForeignKey(NotificationType, models.DO_NOTHING)
    message = models.TextField()
    related_blog = models.ForeignKey(Blog, models.DO_NOTHING, blank=True, null=True)
    related_user = models.ForeignKey('UserAccount', models.DO_NOTHING, related_name='notifications_related_user_set', blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    seen = models.BooleanField(blank=True, null=True)
    delivery_status = models.CharField(max_length=20, blank=True, null=True)
    channel = models.ForeignKey(NotificationChannel, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'notifications'


class OperatingSystem(models.Model):
    os_name = models.CharField(unique=True, max_length=32, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'operating_system'


class OtpLogs(models.Model):
    user = models.ForeignKey('UserAccount', models.DO_NOTHING)
    otp_code = models.CharField(max_length=6)
    sent_via = models.CharField(max_length=20)
    is_verified = models.BooleanField(blank=True, null=True)
    expires_at = models.DateTimeField()
    created_at = models.DateTimeField(blank=True, null=True)
    verified_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'otp_logs'


class Permissions(models.Model):
    permission_id = models.AutoField(primary_key=True)
    permission_desc = models.CharField(unique=True, max_length=50)

    class Meta:
        managed = False
        db_table = 'permissions'


class PermissionsGranted(models.Model):
    pk = models.CompositePrimaryKey('role_id', 'permission_id')
    role = models.ForeignKey('UserRole', models.DO_NOTHING)
    permission = models.ForeignKey(Permissions, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'permissions_granted'


class SchemaMigrations(models.Model):
    version = models.BigIntegerField(primary_key=True)
    dirty = models.BooleanField()

    class Meta:
        managed = False
        db_table = 'schema_migrations'


class SmsNotifications(models.Model):
    user = models.ForeignKey('UserAccount', models.DO_NOTHING)
    message = models.TextField()
    phone_number = models.CharField(max_length=20)
    message_status = models.CharField(max_length=50, blank=True, null=True)
    sent_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sms_notifications'


class TokenManagement(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey('UserAccount', models.DO_NOTHING)
    token = models.CharField(max_length=255)
    token_type = models.CharField(max_length=50)
    status = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    expires_at = models.DateTimeField(blank=True, null=True)
    used_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'token_management'
        unique_together = (('user', 'token', 'token_type'),)


class Topics(models.Model):
    description = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    user = models.ForeignKey('UserAccount', models.DO_NOTHING, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'topics'


class UserAccount(models.Model):
    id = models.BigAutoField(primary_key=True)
    account_id = models.CharField(unique=True, max_length=64)
    username = models.CharField(max_length=32)
    first_name = models.CharField(max_length=32, blank=True, null=True)
    last_name = models.CharField(max_length=32, blank=True, null=True)
    email = models.CharField(unique=True, max_length=128)
    date_of_birth = models.DateField(blank=True, null=True)
    role_id = models.IntegerField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    avatar_url = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    contact_number = models.CharField(max_length=20, blank=True, null=True)
    user_status = models.ForeignKey('UserStatus', models.DO_NOTHING, db_column='user_status')
    linkedin = models.CharField(max_length=255, blank=True, null=True)
    github = models.CharField(max_length=255, blank=True, null=True)
    twitter = models.CharField(max_length=255, blank=True, null=True)
    instagram = models.CharField(max_length=255, blank=True, null=True)
    view_permission = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_account'


class UserAccountLog(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(UserAccount, models.DO_NOTHING)
    timestamp = models.DateTimeField(blank=True, null=True)
    ip_address = models.CharField(max_length=20, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    client = models.ForeignKey(Clients, models.DO_NOTHING)
    operating_sys = models.ForeignKey(OperatingSystem, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_account_log'


class UserAuthInfo(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(UserAccount, models.DO_NOTHING)
    password_hash = models.CharField(max_length=255)
    created_at = models.DateTimeField(blank=True, null=True)
    password_recovery_token = models.CharField(max_length=100, blank=True, null=True)
    password_recovery_timeout = models.DateTimeField(blank=True, null=True)
    password_updated_at = models.DateTimeField(blank=True, null=True)
    email_validation_token = models.CharField(max_length=100, blank=True, null=True)
    email_verification_timeout = models.DateTimeField(blank=True, null=True)
    email_validation_status = models.ForeignKey(EmailValidationStatus, models.DO_NOTHING, db_column='email_validation_status')
    email_validation_time = models.DateTimeField(blank=True, null=True)
    auth_provider = models.ForeignKey(AuthProvider, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'user_auth_info'


class UserFollows(models.Model):
    id = models.BigAutoField(primary_key=True)
    follower = models.ForeignKey(UserAccount, models.DO_NOTHING)
    following = models.ForeignKey(UserAccount, models.DO_NOTHING, related_name='userfollows_following_set')
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_follows'
        unique_together = (('follower', 'following'),)


class UserInterest(models.Model):
    pk = models.CompositePrimaryKey('user_id', 'topics_id')
    user = models.ForeignKey(UserAccount, models.DO_NOTHING)
    topics = models.ForeignKey(Topics, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'user_interest'


class UserNotificationPreferences(models.Model):
    pk = models.CompositePrimaryKey('user_id', 'channel_id')
    user = models.ForeignKey(UserAccount, models.DO_NOTHING)
    channel = models.ForeignKey(NotificationChannel, models.DO_NOTHING)
    is_enabled = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_notification_preferences'


class UserRole(models.Model):
    role_desc = models.CharField(unique=True, max_length=50)

    class Meta:
        managed = False
        db_table = 'user_role'


class UserStatus(models.Model):
    status = models.CharField(unique=True, max_length=100)

    class Meta:
        managed = False
        db_table = 'user_status'


class WebPushTokens(models.Model):
    user = models.ForeignKey(UserAccount, models.DO_NOTHING)
    endpoint = models.TextField()
    p256dh_key = models.TextField()
    auth_key = models.TextField()

    class Meta:
        managed = False
        db_table = 'web_push_tokens'


class WhatsappNotifications(models.Model):
    user = models.ForeignKey(UserAccount, models.DO_NOTHING)
    message = models.TextField()
    message_status = models.CharField(max_length=50, blank=True, null=True)
    sent_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'whatsapp_notifications'
