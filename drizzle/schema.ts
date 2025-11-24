import {
	pgTable,
	unique,
	serial,
	varchar,
	index,
	foreignKey,
	bigserial,
	date,
	integer,
	text,
	timestamp,
	bigint,
	boolean,
	check,
	smallint,
	uniqueIndex,
	primaryKey,
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const userStatus = pgTable(
	'user_status',
	{
		id: serial().primaryKey().notNull(),
		status: varchar({ length: 100 }).notNull(),
	},
	(table) => [unique('user_status_status_key').on(table.status)]
)

export const userAccount = pgTable(
	'user_account',
	{
		id: bigserial({ mode: 'bigint' }).primaryKey().notNull(),
		accountId: varchar('account_id', { length: 64 }).notNull(),
		username: varchar({ length: 32 }).notNull(),
		firstName: varchar('first_name', { length: 32 }),
		lastName: varchar('last_name', { length: 32 }),
		email: varchar({ length: 128 }).notNull(),
		dateOfBirth: date('date_of_birth'),
		roleId: integer('role_id'),
		bio: text(),
		avatarUrl: text('avatar_url'),
		createdAt: timestamp('created_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
		updatedAt: timestamp('updated_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
		address: varchar({ length: 255 }),
		contactNumber: varchar('contact_number', { length: 20 }),
		userStatus: integer('user_status').notNull(),
		linkedin: varchar({ length: 255 }),
		github: varchar({ length: 255 }),
		twitter: varchar({ length: 255 }),
		instagram: varchar({ length: 255 }),
		viewPermission: varchar('view_permission', { length: 50 }).default('public'),
	},
	(table) => [
		index('idx_user_account_account_id').using(
			'btree',
			table.accountId.asc().nullsLast().op('text_ops')
		),
		index('idx_user_account_created_at').using(
			'btree',
			table.createdAt.asc().nullsLast().op('timestamp_ops')
		),
		index('idx_user_account_email').using('btree', table.email.asc().nullsLast().op('text_ops')),
		index('idx_user_account_username').using(
			'btree',
			table.username.asc().nullsLast().op('text_ops')
		),
		foreignKey({
			columns: [table.userStatus],
			foreignColumns: [userStatus.id],
			name: 'user_account_user_status_fkey',
		}).onDelete('cascade'),
		unique('user_account_account_id_key').on(table.accountId),
		unique('user_account_email_key').on(table.email),
	]
)

export const userFollows = pgTable(
	'user_follows',
	{
		id: bigserial({ mode: 'bigint' }).primaryKey().notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		followerId: bigint('follower_id', { mode: 'number' }).notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		followingId: bigint('following_id', { mode: 'number' }).notNull(),
		createdAt: timestamp('created_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	},
	(table) => [
		foreignKey({
			columns: [table.followerId],
			foreignColumns: [userAccount.id],
			name: 'user_follows_follower_id_fkey',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.followingId],
			foreignColumns: [userAccount.id],
			name: 'user_follows_following_id_fkey',
		}).onDelete('cascade'),
		unique('user_follows_follower_id_following_id_key').on(table.followerId, table.followingId),
	]
)

export const userAuthInfo = pgTable(
	'user_auth_info',
	{
		id: bigserial({ mode: 'bigint' }).primaryKey().notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		userId: bigint('user_id', { mode: 'bigint' }).notNull(),
		passwordHash: varchar('password_hash', { length: 255 }).notNull(),
		createdAt: timestamp('created_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
		passwordRecoveryToken: varchar('password_recovery_token', { length: 100 }),
		passwordRecoveryTimeout: timestamp('password_recovery_timeout', { mode: 'string' }),
		passwordUpdatedAt: timestamp('password_updated_at', { mode: 'string' }),
		emailValidationToken: varchar('email_validation_token', { length: 100 }),
		emailVerificationTimeout: timestamp('email_verification_timeout', { mode: 'string' }),
		emailValidationStatus: integer('email_validation_status').notNull(),
		emailValidationTime: timestamp('email_validation_time', { mode: 'string' }),
		authProviderId: integer('auth_provider_id').notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [userAccount.id],
			name: 'user_auth_info_user_id_fkey',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.emailValidationStatus],
			foreignColumns: [emailValidationStatus.id],
			name: 'user_auth_info_email_validation_status_fkey',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.authProviderId],
			foreignColumns: [authProvider.id],
			name: 'user_auth_info_auth_provider_id_fkey',
		}).onDelete('cascade'),
	]
)

export const emailValidationStatus = pgTable(
	'email_validation_status',
	{
		id: serial().primaryKey().notNull(),
		status: varchar({ length: 100 }).notNull(),
	},
	(table) => [unique('email_validation_status_status_key').on(table.status)]
)

export const schemaMigrations = pgTable('schema_migrations', {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	version: bigint({ mode: 'number' }).primaryKey().notNull(),
	dirty: boolean().notNull(),
})

export const authProvider = pgTable(
	'auth_provider',
	{
		id: serial().primaryKey().notNull(),
		providerName: varchar('provider_name', { length: 100 }).notNull(),
	},
	(table) => [unique('auth_provider_provider_name_key').on(table.providerName)]
)

export const tokenManagement = pgTable(
	'token_management',
	{
		id: bigserial({ mode: 'bigint' }).primaryKey().notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		userId: bigint('user_id', { mode: 'number' }).notNull(),
		token: varchar({ length: 255 }).notNull(),
		tokenType: varchar('token_type', { length: 50 }).notNull(),
		status: varchar({ length: 50 }).default('active'),
		createdAt: timestamp('created_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
		expiresAt: timestamp('expires_at', { mode: 'string' }),
		usedAt: timestamp('used_at', { mode: 'string' }),
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [userAccount.id],
			name: 'token_management_user_id_fkey',
		}).onDelete('cascade'),
		unique('token_management_user_id_token_token_type_key').on(
			table.userId,
			table.token,
			table.tokenType
		),
	]
)

export const userRole = pgTable(
	'user_role',
	{
		id: serial().primaryKey().notNull(),
		roleDesc: varchar('role_desc', { length: 50 }).notNull(),
	},
	(table) => [unique('user_role_role_desc_key').on(table.roleDesc)]
)

export const permissions = pgTable(
	'permissions',
	{
		permissionId: serial('permission_id').primaryKey().notNull(),
		permissionDesc: varchar('permission_desc', { length: 50 }).notNull(),
	},
	(table) => [unique('permissions_permission_desc_key').on(table.permissionDesc)]
)

export const blog = pgTable(
	'blog',
	{
		id: bigserial({ mode: 'bigint' }).primaryKey().notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		userId: bigint('user_id', { mode: 'number' }).notNull(),
		blogId: varchar('blog_id', { length: 255 }).notNull(),
		createdAt: timestamp('created_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
		updatedAt: timestamp('updated_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
		status: varchar({ length: 50 }),
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [userAccount.id],
			name: 'blog_user_id_fkey',
		}).onDelete('cascade'),
		unique('blog_blog_id_key').on(table.blogId),
	]
)

export const blogPermissions = pgTable(
	'blog_permissions',
	{
		id: bigserial({ mode: 'bigint' }).primaryKey().notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		blogId: bigint('blog_id', { mode: 'number' }).notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		userId: bigint('user_id', { mode: 'number' }).notNull(),
		permissionType: varchar('permission_type', { length: 50 }).notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.blogId],
			foreignColumns: [blog.id],
			name: 'blog_permissions_blog_id_fkey',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.userId],
			foreignColumns: [userAccount.id],
			name: 'blog_permissions_user_id_fkey',
		}).onDelete('cascade'),
	]
)

export const coAuthorInvites = pgTable(
	'co_author_invites',
	{
		id: serial().primaryKey().notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		blogId: bigint('blog_id', { mode: 'number' }).notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		inviterId: bigint('inviter_id', { mode: 'number' }).notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		inviteeId: bigint('invitee_id', { mode: 'number' }).notNull(),
		inviteStatus: varchar('invite_status', { length: 50 }).default('pending').notNull(),
		createdAt: timestamp('created_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
		respondedAt: timestamp('responded_at', { mode: 'string' }),
	},
	(table) => [
		foreignKey({
			columns: [table.blogId],
			foreignColumns: [blog.id],
			name: 'co_author_invites_blog_id_fkey',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.inviterId],
			foreignColumns: [userAccount.id],
			name: 'co_author_invites_inviter_id_fkey',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.inviteeId],
			foreignColumns: [userAccount.id],
			name: 'co_author_invites_invitee_id_fkey',
		}).onDelete('cascade'),
	]
)

export const coAuthorPermissions = pgTable(
	'co_author_permissions',
	{
		id: serial().primaryKey().notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		blogId: bigint('blog_id', { mode: 'number' }).notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		coAuthorId: bigint('co_author_id', { mode: 'number' }).notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		roleId: bigint('role_id', { mode: 'number' }).notNull(),
		grantedAt: timestamp('granted_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	},
	(table) => [
		foreignKey({
			columns: [table.blogId],
			foreignColumns: [blog.id],
			name: 'co_author_permissions_blog_id_fkey',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.coAuthorId],
			foreignColumns: [userAccount.id],
			name: 'co_author_permissions_co_author_id_fkey',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.roleId],
			foreignColumns: [userRole.id],
			name: 'co_author_permissions_role_id_fkey',
		}).onDelete('cascade'),
	]
)

export const blogLikes = pgTable(
	'blog_likes',
	{
		id: bigserial({ mode: 'bigint' }).primaryKey().notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		userId: bigint('user_id', { mode: 'number' }).notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		blogId: bigint('blog_id', { mode: 'number' }).notNull(),
		createdAt: timestamp('created_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [userAccount.id],
			name: 'blog_likes_user_id_fkey',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.blogId],
			foreignColumns: [blog.id],
			name: 'blog_likes_blog_id_fkey',
		}).onDelete('cascade'),
		unique('blog_likes_user_id_blog_id_key').on(table.userId, table.blogId),
	]
)

export const blogComments = pgTable(
	'blog_comments',
	{
		commentId: bigserial('comment_id', { mode: 'bigint' }).primaryKey().notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		userId: bigint('user_id', { mode: 'number' }).notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		blogId: bigint('blog_id', { mode: 'number' }).notNull(),
		commentText: text('comment_text').notNull(),
		createdAt: timestamp('created_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
		updatedAt: timestamp('updated_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [userAccount.id],
			name: 'blog_comments_user_id_fkey',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.blogId],
			foreignColumns: [blog.id],
			name: 'blog_comments_blog_id_fkey',
		}).onDelete('cascade'),
	]
)

export const userAccountLog = pgTable(
	'user_account_log',
	{
		id: bigserial({ mode: 'bigint' }).primaryKey().notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		userId: bigint('user_id', { mode: 'number' }).notNull(),
		timestamp: timestamp({ mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
		ipAddress: varchar('ip_address', { length: 20 }),
		description: text(),
		clientId: integer('client_id').notNull(),
		operatingSysId: integer('operating_sys_id'),
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [userAccount.id],
			name: 'user_account_log_user_id_fkey',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.clientId],
			foreignColumns: [clients.id],
			name: 'user_account_log_client_id_fkey',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.operatingSysId],
			foreignColumns: [operatingSystem.id],
			name: 'user_account_log_operating_sys_id_fkey',
		}).onDelete('cascade'),
	]
)

export const clients = pgTable(
	'clients',
	{
		id: serial().primaryKey().notNull(),
		cName: varchar('c_name', { length: 32 }),
	},
	(table) => [unique('clients_c_name_key').on(table.cName)]
)

export const operatingSystem = pgTable(
	'operating_system',
	{
		id: serial().primaryKey().notNull(),
		osName: varchar('os_name', { length: 32 }),
	},
	(table) => [unique('operating_system_os_name_key').on(table.osName)]
)

export const loggedInDevices = pgTable(
	'logged_in_devices',
	{
		id: serial().primaryKey().notNull(),
		deviceName: varchar('device_name', { length: 32 }),
		ipAddress: varchar('ip_address', { length: 64 }),
		operatingSys: varchar('operating_sys', { length: 32 }),
		loginTime: timestamp('login_time', { mode: 'string' }),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		userId: bigint('user_id', { mode: 'number' }).notNull(),
		clientId: integer('client_id').notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [userAccount.id],
			name: 'logged_in_devices_user_id_fkey',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.clientId],
			foreignColumns: [clients.id],
			name: 'logged_in_devices_client_id_fkey',
		}).onDelete('cascade'),
	]
)

export const topics = pgTable(
	'topics',
	{
		id: serial().primaryKey().notNull(),
		description: varchar({ length: 100 }).notNull(),
		category: varchar({ length: 100 }).notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		userId: bigint('user_id', { mode: 'number' }),
		createdAt: timestamp('created_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [userAccount.id],
			name: 'topics_user_id_fkey',
		}).onDelete('cascade'),
	]
)

export const blogBookmarks = pgTable(
	'blog_bookmarks',
	{
		id: serial().primaryKey().notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		userId: bigint('user_id', { mode: 'number' }).notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		blogId: bigint('blog_id', { mode: 'number' }).notNull(),
		createdAt: timestamp('created_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [userAccount.id],
			name: 'blog_bookmarks_user_id_fkey',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.blogId],
			foreignColumns: [blog.id],
			name: 'blog_bookmarks_blog_id_fkey',
		}).onDelete('cascade'),
	]
)

export const coAuthorActivityLog = pgTable(
	'co_author_activity_log',
	{
		id: serial().primaryKey().notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		blogId: bigint('blog_id', { mode: 'number' }).notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		coAuthorId: bigint('co_author_id', { mode: 'number' }),
		action: varchar({ length: 50 }).notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		performedBy: bigint('performed_by', { mode: 'number' }).notNull(),
		actionTimestamp: timestamp('action_timestamp', { mode: 'string' }).default(
			sql`CURRENT_TIMESTAMP`
		),
	},
	(table) => [
		foreignKey({
			columns: [table.blogId],
			foreignColumns: [blog.id],
			name: 'co_author_activity_log_blog_id_fkey',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.coAuthorId],
			foreignColumns: [userAccount.id],
			name: 'co_author_activity_log_co_author_id_fkey',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.performedBy],
			foreignColumns: [userAccount.id],
			name: 'co_author_activity_log_performed_by_fkey',
		}).onDelete('cascade'),
	]
)

export const notifications = pgTable(
	'notifications',
	{
		id: serial().primaryKey().notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		userId: bigint('user_id', { mode: 'number' }).notNull(),
		notificationTypeId: integer('notification_type_id').notNull(),
		message: text().notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		relatedBlogId: bigint('related_blog_id', { mode: 'number' }),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		relatedUserId: bigint('related_user_id', { mode: 'number' }),
		createdAt: timestamp('created_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
		seen: boolean().default(false),
		deliveryStatus: varchar('delivery_status', { length: 20 }).default('pending'),
		channelId: integer('channel_id').notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [userAccount.id],
			name: 'notifications_user_id_fkey',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.notificationTypeId],
			foreignColumns: [notificationType.id],
			name: 'notifications_notification_type_id_fkey',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.relatedBlogId],
			foreignColumns: [blog.id],
			name: 'notifications_related_blog_id_fkey',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.relatedUserId],
			foreignColumns: [userAccount.id],
			name: 'notifications_related_user_id_fkey',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.channelId],
			foreignColumns: [notificationChannel.id],
			name: 'notifications_channel_id_fkey',
		}).onDelete('cascade'),
	]
)

export const notificationType = pgTable(
	'notification_type',
	{
		id: serial().primaryKey().notNull(),
		notificationName: varchar('notification_name', { length: 100 }).notNull(),
		description: text(),
	},
	(table) => [unique('notification_type_notification_name_key').on(table.notificationName)]
)

export const notificationChannel = pgTable(
	'notification_channel',
	{
		id: serial().primaryKey().notNull(),
		channelName: varchar('channel_name', { length: 50 }).notNull(),
	},
	(table) => [unique('notification_channel_channel_name_key').on(table.channelName)]
)

export const webPushTokens = pgTable(
	'web_push_tokens',
	{
		id: serial().primaryKey().notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		userId: bigint('user_id', { mode: 'number' }).notNull(),
		endpoint: text().notNull(),
		p256DhKey: text('p256dh_key').notNull(),
		authKey: text('auth_key').notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [userAccount.id],
			name: 'web_push_tokens_user_id_fkey',
		}).onDelete('cascade'),
	]
)

export const emailTemplates = pgTable('email_templates', {
	id: serial().primaryKey().notNull(),
	templateName: varchar('template_name', { length: 100 }).notNull(),
	subject: varchar({ length: 255 }).notNull(),
	body: text().notNull(),
	createdAt: timestamp('created_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
})

export const whatsappNotifications = pgTable(
	'whatsapp_notifications',
	{
		id: serial().primaryKey().notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		userId: bigint('user_id', { mode: 'number' }).notNull(),
		message: text().notNull(),
		messageStatus: varchar('message_status', { length: 50 }).default('pending'),
		sentAt: timestamp('sent_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [userAccount.id],
			name: 'whatsapp_notifications_user_id_fkey',
		}).onDelete('cascade'),
	]
)

export const smsNotifications = pgTable(
	'sms_notifications',
	{
		id: serial().primaryKey().notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		userId: bigint('user_id', { mode: 'number' }).notNull(),
		message: text().notNull(),
		phoneNumber: varchar('phone_number', { length: 20 }).notNull(),
		messageStatus: varchar('message_status', { length: 50 }).default('pending'),
		sentAt: timestamp('sent_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [userAccount.id],
			name: 'sms_notifications_user_id_fkey',
		}).onDelete('cascade'),
	]
)

export const otpLogs = pgTable(
	'otp_logs',
	{
		id: serial().primaryKey().notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		userId: bigint('user_id', { mode: 'number' }).notNull(),
		otpCode: varchar('otp_code', { length: 6 }).notNull(),
		sentVia: varchar('sent_via', { length: 20 }).notNull(),
		isVerified: boolean('is_verified').default(false),
		expiresAt: timestamp('expires_at', { mode: 'string' }).notNull(),
		createdAt: timestamp('created_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
		verifiedAt: timestamp('verified_at', { mode: 'string' }),
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [userAccount.id],
			name: 'otp_logs_user_id_fkey',
		}).onDelete('cascade'),
	]
)

export const djangoMigrations = pgTable('django_migrations', {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: 'number' }).primaryKey().generatedByDefaultAsIdentity({
		name: 'django_migrations_id_seq',
		startWith: 1,
		increment: 1,
		minValue: 1,
		maxValue: 9223372036854775807,
		cache: 1,
	}),
	app: varchar({ length: 255 }).notNull(),
	name: varchar({ length: 255 }).notNull(),
	applied: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
})

export const djangoContentType = pgTable(
	'django_content_type',
	{
		id: integer().primaryKey().generatedByDefaultAsIdentity({
			name: 'django_content_type_id_seq',
			startWith: 1,
			increment: 1,
			minValue: 1,
			maxValue: 2147483647,
			cache: 1,
		}),
		appLabel: varchar('app_label', { length: 100 }).notNull(),
		model: varchar({ length: 100 }).notNull(),
	},
	(table) => [
		unique('django_content_type_app_label_model_76bd3d3b_uniq').on(table.appLabel, table.model),
	]
)

export const djangoAdminLog = pgTable(
	'django_admin_log',
	{
		id: integer().primaryKey().generatedByDefaultAsIdentity({
			name: 'django_admin_log_id_seq',
			startWith: 1,
			increment: 1,
			minValue: 1,
			maxValue: 2147483647,
			cache: 1,
		}),
		actionTime: timestamp('action_time', { withTimezone: true, mode: 'string' }).notNull(),
		objectId: text('object_id'),
		objectRepr: varchar('object_repr', { length: 200 }).notNull(),
		actionFlag: smallint('action_flag').notNull(),
		changeMessage: text('change_message').notNull(),
		contentTypeId: integer('content_type_id'),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		userId: bigint('user_id', { mode: 'number' }).notNull(),
	},
	(table) => [
		index('django_admin_log_content_type_id_c4bce8eb').using(
			'btree',
			table.contentTypeId.asc().nullsLast().op('int4_ops')
		),
		index('django_admin_log_user_id_c564eba6').using(
			'btree',
			table.userId.asc().nullsLast().op('int8_ops')
		),
		foreignKey({
			columns: [table.contentTypeId],
			foreignColumns: [djangoContentType.id],
			name: 'django_admin_log_content_type_id_c4bce8eb_fk_django_co',
		}),
		foreignKey({
			columns: [table.userId],
			foreignColumns: [userAccount.id],
			name: 'django_admin_log_user_id_c564eba6_fk_user_account_id',
		}),
		check('django_admin_log_action_flag_check', sql`action_flag >= 0`),
	]
)

export const authPermission = pgTable(
	'auth_permission',
	{
		id: integer().primaryKey().generatedByDefaultAsIdentity({
			name: 'auth_permission_id_seq',
			startWith: 1,
			increment: 1,
			minValue: 1,
			maxValue: 2147483647,
			cache: 1,
		}),
		name: varchar({ length: 255 }).notNull(),
		contentTypeId: integer('content_type_id').notNull(),
		codename: varchar({ length: 100 }).notNull(),
	},
	(table) => [
		index('auth_permission_content_type_id_2f476e4b').using(
			'btree',
			table.contentTypeId.asc().nullsLast().op('int4_ops')
		),
		foreignKey({
			columns: [table.contentTypeId],
			foreignColumns: [djangoContentType.id],
			name: 'auth_permission_content_type_id_2f476e4b_fk_django_co',
		}),
		unique('auth_permission_content_type_id_codename_01ab375a_uniq').on(
			table.contentTypeId,
			table.codename
		),
	]
)

export const authGroup = pgTable(
	'auth_group',
	{
		id: integer().primaryKey().generatedByDefaultAsIdentity({
			name: 'auth_group_id_seq',
			startWith: 1,
			increment: 1,
			minValue: 1,
			maxValue: 2147483647,
			cache: 1,
		}),
		name: varchar({ length: 150 }).notNull(),
	},
	(table) => [
		index('auth_group_name_a6ea08ec_like').using(
			'btree',
			table.name.asc().nullsLast().op('varchar_pattern_ops')
		),
		unique('auth_group_name_key').on(table.name),
	]
)

export const authGroupPermissions = pgTable(
	'auth_group_permissions',
	{
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		id: bigint({ mode: 'number' }).primaryKey().generatedByDefaultAsIdentity({
			name: 'auth_group_permissions_id_seq',
			startWith: 1,
			increment: 1,
			minValue: 1,
			maxValue: 9223372036854775807,
			cache: 1,
		}),
		groupId: integer('group_id').notNull(),
		permissionId: integer('permission_id').notNull(),
	},
	(table) => [
		index('auth_group_permissions_group_id_b120cbf9').using(
			'btree',
			table.groupId.asc().nullsLast().op('int4_ops')
		),
		index('auth_group_permissions_permission_id_84c5c92e').using(
			'btree',
			table.permissionId.asc().nullsLast().op('int4_ops')
		),
		foreignKey({
			columns: [table.groupId],
			foreignColumns: [authGroup.id],
			name: 'auth_group_permissions_group_id_b120cbf9_fk_auth_group_id',
		}),
		foreignKey({
			columns: [table.permissionId],
			foreignColumns: [authPermission.id],
			name: 'auth_group_permissio_permission_id_84c5c92e_fk_auth_perm',
		}),
		unique('auth_group_permissions_group_id_permission_id_0cd325b0_uniq').on(
			table.groupId,
			table.permissionId
		),
	]
)

export const djangoSession = pgTable(
	'django_session',
	{
		sessionKey: varchar('session_key', { length: 40 }).primaryKey().notNull(),
		sessionData: text('session_data').notNull(),
		expireDate: timestamp('expire_date', { withTimezone: true, mode: 'string' }).notNull(),
	},
	(table) => [
		index('django_session_expire_date_a5c62663').using(
			'btree',
			table.expireDate.asc().nullsLast().op('timestamptz_ops')
		),
		index('django_session_session_key_c0390e0f_like').using(
			'btree',
			table.sessionKey.asc().nullsLast().op('varchar_pattern_ops')
		),
	]
)

export const reports = pgTable(
	'reports',
	{
		reportId: bigserial('report_id', { mode: 'bigint' }).primaryKey().notNull(),
		reasonType: varchar('reason_type', { length: 255 }).notNull(),
		flagCount: integer('flag_count').default(0).notNull(),
		reporterId: integer('reporter_id').notNull(),
		reportedType: varchar('reported_type', { length: 255 }),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		reportedBlogId: bigint('reported_blog_id', { mode: 'number' }),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		reportedUserId: bigint('reported_user_id', { mode: 'number' }),
		status: varchar({ length: 255 }).default('PENDING'),
		reporterNotes: text('reporter_notes'),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		moderatorId: bigint('moderator_id', { mode: 'number' }),
		moderatorNotes: text('moderator_notes'),
		verdict: varchar({ length: 255 }),
		createdAt: timestamp('created_at', { mode: 'string' })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: timestamp('updated_at', { mode: 'string' })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
	},
	(table) => [
		uniqueIndex('idx_active_user_reports')
			.using(
				'btree',
				table.reporterId.asc().nullsLast().op('int8_ops'),
				table.reportedBlogId.asc().nullsLast().op('int4_ops'),
				table.reportedUserId.asc().nullsLast().op('int8_ops')
			)
			.where(
				sql`((status)::text = ANY ((ARRAY['PENDING'::character varying, 'IN_PROGRESS'::character varying])::text[]))`
			),
		foreignKey({
			columns: [table.moderatorId],
			foreignColumns: [userAccount.id],
			name: 'reports_moderator_id_fkey',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.reporterId],
			foreignColumns: [userAccount.id],
			name: 'reports_reporter_id_fkey',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.reportedUserId],
			foreignColumns: [userAccount.id],
			name: 'reports_reported_user_id_fkey',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.reportedBlogId],
			foreignColumns: [blog.id],
			name: 'reports_reported_blog_id_fkey',
		}).onDelete('cascade'),
		check(
			'reported_type_values',
			sql`(reported_type)::text = ANY ((ARRAY['BLOG'::character varying, 'USER'::character varying])::text[])`
		),
		check(
			'report_reason_types',
			sql`(reason_type)::text = ANY ((ARRAY['SPAM'::character varying, 'ABUSE'::character varying, 'NSFW'::character varying, 'MISINFORMATION'::character varying, 'OTHER'::character varying])::text[])`
		),
		check(
			'report_status_types',
			sql`(status)::text = ANY ((ARRAY['PENDING'::character varying, 'IN_PROGRESS'::character varying, 'RESOLVED'::character varying])::text[])`
		),
		check(
			'verdict_types',
			sql`(verdict)::text = ANY ((ARRAY['BANNED'::character varying, 'DELETED'::character varying, 'IGNORE'::character varying])::text[])`
		),
		check('exactly_one_fk', sql`(reported_blog_id IS NOT NULL) OR (reported_user_id IS NOT NULL)`),
		check('no_report_self', sql`reporter_id <> reported_user_id`),
	]
)

export const permissionsGranted = pgTable(
	'permissions_granted',
	{
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		roleId: bigint('role_id', { mode: 'number' }).notNull(),
		permissionId: integer('permission_id').notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.roleId],
			foreignColumns: [userRole.id],
			name: 'permissions_granted_role_id_fkey',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.permissionId],
			foreignColumns: [permissions.permissionId],
			name: 'permissions_granted_permission_id_fkey',
		}).onDelete('cascade'),
		primaryKey({ columns: [table.roleId, table.permissionId], name: 'permissions_granted_pkey' }),
	]
)

export const userInterest = pgTable(
	'user_interest',
	{
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		userId: bigint('user_id', { mode: 'number' }).notNull(),
		topicsId: integer('topics_id').notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [userAccount.id],
			name: 'user_interest_user_id_fkey',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.topicsId],
			foreignColumns: [topics.id],
			name: 'user_interest_topics_id_fkey',
		}).onDelete('cascade'),
		primaryKey({ columns: [table.userId, table.topicsId], name: 'user_interest_pkey' }),
	]
)

export const userNotificationPreferences = pgTable(
	'user_notification_preferences',
	{
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		userId: bigint('user_id', { mode: 'number' }).notNull(),
		channelId: integer('channel_id').notNull(),
		isEnabled: boolean('is_enabled').default(true),
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [userAccount.id],
			name: 'user_notification_preferences_user_id_fkey',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.channelId],
			foreignColumns: [notificationChannel.id],
			name: 'user_notification_preferences_channel_id_fkey',
		}).onDelete('cascade'),
		primaryKey({
			columns: [table.userId, table.channelId],
			name: 'user_notification_preferences_pkey',
		}),
	]
)

export const reportFlags = pgTable(
	'report_flags',
	{
		reportId: integer('report_id').notNull(),
		userId: integer('user_id').notNull(),
		flaggedAt: timestamp('flagged_at', { mode: 'string' })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.reportId],
			foreignColumns: [reports.reportId],
			name: 'report_flags_report_id_fkey',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.userId],
			foreignColumns: [userAccount.id],
			name: 'report_flags_user_id_fkey',
		}).onDelete('cascade'),
		primaryKey({ columns: [table.reportId, table.userId], name: 'report_flags_pkey' }),
	]
)
