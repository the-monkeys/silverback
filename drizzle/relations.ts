import { relations } from 'drizzle-orm/relations'
import {
	userStatus,
	userAccount,
	userFollows,
	userAuthInfo,
	emailValidationStatus,
	authProvider,
	tokenManagement,
	blog,
	blogPermissions,
	coAuthorInvites,
	coAuthorPermissions,
	userRole,
	blogLikes,
	blogComments,
	userAccountLog,
	clients,
	operatingSystem,
	loggedInDevices,
	topics,
	blogBookmarks,
	coAuthorActivityLog,
	notifications,
	notificationType,
	notificationChannel,
	webPushTokens,
	whatsappNotifications,
	smsNotifications,
	otpLogs,
	djangoContentType,
	djangoAdminLog,
	authPermission,
	authGroup,
	authGroupPermissions,
	reports,
	permissionsGranted,
	permissions,
	userInterest,
	userNotificationPreferences,
	reportFlags,
} from './schema.js'

export const userAccountRelations = relations(userAccount, ({ one, many }) => ({
	userStatus: one(userStatus, {
		fields: [userAccount.userStatus],
		references: [userStatus.id],
	}),
	userFollows_followerId: many(userFollows, {
		relationName: 'userFollows_followerId_userAccount_id',
	}),
	userFollows_followingId: many(userFollows, {
		relationName: 'userFollows_followingId_userAccount_id',
	}),
	userAuthInfos: many(userAuthInfo),
	tokenManagements: many(tokenManagement),
	blogs: many(blog),
	blogPermissions: many(blogPermissions),
	coAuthorInvites_inviterId: many(coAuthorInvites, {
		relationName: 'coAuthorInvites_inviterId_userAccount_id',
	}),
	coAuthorInvites_inviteeId: many(coAuthorInvites, {
		relationName: 'coAuthorInvites_inviteeId_userAccount_id',
	}),
	coAuthorPermissions: many(coAuthorPermissions),
	blogLikes: many(blogLikes),
	blogComments: many(blogComments),
	userAccountLogs: many(userAccountLog),
	loggedInDevices: many(loggedInDevices),
	topics: many(topics),
	blogBookmarks: many(blogBookmarks),
	coAuthorActivityLogs_coAuthorId: many(coAuthorActivityLog, {
		relationName: 'coAuthorActivityLog_coAuthorId_userAccount_id',
	}),
	coAuthorActivityLogs_performedBy: many(coAuthorActivityLog, {
		relationName: 'coAuthorActivityLog_performedBy_userAccount_id',
	}),
	notifications_userId: many(notifications, {
		relationName: 'notifications_userId_userAccount_id',
	}),
	notifications_relatedUserId: many(notifications, {
		relationName: 'notifications_relatedUserId_userAccount_id',
	}),
	webPushTokens: many(webPushTokens),
	whatsappNotifications: many(whatsappNotifications),
	smsNotifications: many(smsNotifications),
	otpLogs: many(otpLogs),
	djangoAdminLogs: many(djangoAdminLog),
	reports_moderatorId: many(reports, {
		relationName: 'reports_moderatorId_userAccount_id',
	}),
	reports_reporterId: many(reports, {
		relationName: 'reports_reporterId_userAccount_id',
	}),
	reports_reportedUserId: many(reports, {
		relationName: 'reports_reportedUserId_userAccount_id',
	}),
	userInterests: many(userInterest),
	userNotificationPreferences: many(userNotificationPreferences),
	reportFlags: many(reportFlags),
}))

export const userStatusRelations = relations(userStatus, ({ many }) => ({
	userAccounts: many(userAccount),
}))

export const userFollowsRelations = relations(userFollows, ({ one }) => ({
	userAccount_followerId: one(userAccount, {
		fields: [userFollows.followerId],
		references: [userAccount.id],
		relationName: 'userFollows_followerId_userAccount_id',
	}),
	userAccount_followingId: one(userAccount, {
		fields: [userFollows.followingId],
		references: [userAccount.id],
		relationName: 'userFollows_followingId_userAccount_id',
	}),
}))

export const userAuthInfoRelations = relations(userAuthInfo, ({ one }) => ({
	userAccount: one(userAccount, {
		fields: [userAuthInfo.userId],
		references: [userAccount.id],
	}),
	emailValidationStatus: one(emailValidationStatus, {
		fields: [userAuthInfo.emailValidationStatus],
		references: [emailValidationStatus.id],
	}),
	authProvider: one(authProvider, {
		fields: [userAuthInfo.authProviderId],
		references: [authProvider.id],
	}),
}))

export const emailValidationStatusRelations = relations(emailValidationStatus, ({ many }) => ({
	userAuthInfos: many(userAuthInfo),
}))

export const authProviderRelations = relations(authProvider, ({ many }) => ({
	userAuthInfos: many(userAuthInfo),
}))

export const tokenManagementRelations = relations(tokenManagement, ({ one }) => ({
	userAccount: one(userAccount, {
		fields: [tokenManagement.userId],
		references: [userAccount.id],
	}),
}))

export const blogRelations = relations(blog, ({ one, many }) => ({
	userAccount: one(userAccount, {
		fields: [blog.userId],
		references: [userAccount.id],
	}),
	blogPermissions: many(blogPermissions),
	coAuthorInvites: many(coAuthorInvites),
	coAuthorPermissions: many(coAuthorPermissions),
	blogLikes: many(blogLikes),
	blogComments: many(blogComments),
	blogBookmarks: many(blogBookmarks),
	coAuthorActivityLogs: many(coAuthorActivityLog),
	notifications: many(notifications),
	reports: many(reports),
}))

export const blogPermissionsRelations = relations(blogPermissions, ({ one }) => ({
	blog: one(blog, {
		fields: [blogPermissions.blogId],
		references: [blog.id],
	}),
	userAccount: one(userAccount, {
		fields: [blogPermissions.userId],
		references: [userAccount.id],
	}),
}))

export const coAuthorInvitesRelations = relations(coAuthorInvites, ({ one }) => ({
	blog: one(blog, {
		fields: [coAuthorInvites.blogId],
		references: [blog.id],
	}),
	userAccount_inviterId: one(userAccount, {
		fields: [coAuthorInvites.inviterId],
		references: [userAccount.id],
		relationName: 'coAuthorInvites_inviterId_userAccount_id',
	}),
	userAccount_inviteeId: one(userAccount, {
		fields: [coAuthorInvites.inviteeId],
		references: [userAccount.id],
		relationName: 'coAuthorInvites_inviteeId_userAccount_id',
	}),
}))

export const coAuthorPermissionsRelations = relations(coAuthorPermissions, ({ one }) => ({
	blog: one(blog, {
		fields: [coAuthorPermissions.blogId],
		references: [blog.id],
	}),
	userAccount: one(userAccount, {
		fields: [coAuthorPermissions.coAuthorId],
		references: [userAccount.id],
	}),
	userRole: one(userRole, {
		fields: [coAuthorPermissions.roleId],
		references: [userRole.id],
	}),
}))

export const userRoleRelations = relations(userRole, ({ many }) => ({
	coAuthorPermissions: many(coAuthorPermissions),
	permissionsGranteds: many(permissionsGranted),
}))

export const blogLikesRelations = relations(blogLikes, ({ one }) => ({
	userAccount: one(userAccount, {
		fields: [blogLikes.userId],
		references: [userAccount.id],
	}),
	blog: one(blog, {
		fields: [blogLikes.blogId],
		references: [blog.id],
	}),
}))

export const blogCommentsRelations = relations(blogComments, ({ one }) => ({
	userAccount: one(userAccount, {
		fields: [blogComments.userId],
		references: [userAccount.id],
	}),
	blog: one(blog, {
		fields: [blogComments.blogId],
		references: [blog.id],
	}),
}))

export const userAccountLogRelations = relations(userAccountLog, ({ one }) => ({
	userAccount: one(userAccount, {
		fields: [userAccountLog.userId],
		references: [userAccount.id],
	}),
	client: one(clients, {
		fields: [userAccountLog.clientId],
		references: [clients.id],
	}),
	operatingSystem: one(operatingSystem, {
		fields: [userAccountLog.operatingSysId],
		references: [operatingSystem.id],
	}),
}))

export const clientsRelations = relations(clients, ({ many }) => ({
	userAccountLogs: many(userAccountLog),
	loggedInDevices: many(loggedInDevices),
}))

export const operatingSystemRelations = relations(operatingSystem, ({ many }) => ({
	userAccountLogs: many(userAccountLog),
}))

export const loggedInDevicesRelations = relations(loggedInDevices, ({ one }) => ({
	userAccount: one(userAccount, {
		fields: [loggedInDevices.userId],
		references: [userAccount.id],
	}),
	client: one(clients, {
		fields: [loggedInDevices.clientId],
		references: [clients.id],
	}),
}))

export const topicsRelations = relations(topics, ({ one, many }) => ({
	userAccount: one(userAccount, {
		fields: [topics.userId],
		references: [userAccount.id],
	}),
	userInterests: many(userInterest),
}))

export const blogBookmarksRelations = relations(blogBookmarks, ({ one }) => ({
	userAccount: one(userAccount, {
		fields: [blogBookmarks.userId],
		references: [userAccount.id],
	}),
	blog: one(blog, {
		fields: [blogBookmarks.blogId],
		references: [blog.id],
	}),
}))

export const coAuthorActivityLogRelations = relations(coAuthorActivityLog, ({ one }) => ({
	blog: one(blog, {
		fields: [coAuthorActivityLog.blogId],
		references: [blog.id],
	}),
	userAccount_coAuthorId: one(userAccount, {
		fields: [coAuthorActivityLog.coAuthorId],
		references: [userAccount.id],
		relationName: 'coAuthorActivityLog_coAuthorId_userAccount_id',
	}),
	userAccount_performedBy: one(userAccount, {
		fields: [coAuthorActivityLog.performedBy],
		references: [userAccount.id],
		relationName: 'coAuthorActivityLog_performedBy_userAccount_id',
	}),
}))

export const notificationsRelations = relations(notifications, ({ one }) => ({
	userAccount_userId: one(userAccount, {
		fields: [notifications.userId],
		references: [userAccount.id],
		relationName: 'notifications_userId_userAccount_id',
	}),
	notificationType: one(notificationType, {
		fields: [notifications.notificationTypeId],
		references: [notificationType.id],
	}),
	blog: one(blog, {
		fields: [notifications.relatedBlogId],
		references: [blog.id],
	}),
	userAccount_relatedUserId: one(userAccount, {
		fields: [notifications.relatedUserId],
		references: [userAccount.id],
		relationName: 'notifications_relatedUserId_userAccount_id',
	}),
	notificationChannel: one(notificationChannel, {
		fields: [notifications.channelId],
		references: [notificationChannel.id],
	}),
}))

export const notificationTypeRelations = relations(notificationType, ({ many }) => ({
	notifications: many(notifications),
}))

export const notificationChannelRelations = relations(notificationChannel, ({ many }) => ({
	notifications: many(notifications),
	userNotificationPreferences: many(userNotificationPreferences),
}))

export const webPushTokensRelations = relations(webPushTokens, ({ one }) => ({
	userAccount: one(userAccount, {
		fields: [webPushTokens.userId],
		references: [userAccount.id],
	}),
}))

export const whatsappNotificationsRelations = relations(whatsappNotifications, ({ one }) => ({
	userAccount: one(userAccount, {
		fields: [whatsappNotifications.userId],
		references: [userAccount.id],
	}),
}))

export const smsNotificationsRelations = relations(smsNotifications, ({ one }) => ({
	userAccount: one(userAccount, {
		fields: [smsNotifications.userId],
		references: [userAccount.id],
	}),
}))

export const otpLogsRelations = relations(otpLogs, ({ one }) => ({
	userAccount: one(userAccount, {
		fields: [otpLogs.userId],
		references: [userAccount.id],
	}),
}))

export const djangoAdminLogRelations = relations(djangoAdminLog, ({ one }) => ({
	djangoContentType: one(djangoContentType, {
		fields: [djangoAdminLog.contentTypeId],
		references: [djangoContentType.id],
	}),
	userAccount: one(userAccount, {
		fields: [djangoAdminLog.userId],
		references: [userAccount.id],
	}),
}))

export const djangoContentTypeRelations = relations(djangoContentType, ({ many }) => ({
	djangoAdminLogs: many(djangoAdminLog),
	authPermissions: many(authPermission),
}))

export const authPermissionRelations = relations(authPermission, ({ one, many }) => ({
	djangoContentType: one(djangoContentType, {
		fields: [authPermission.contentTypeId],
		references: [djangoContentType.id],
	}),
	authGroupPermissions: many(authGroupPermissions),
}))

export const authGroupPermissionsRelations = relations(authGroupPermissions, ({ one }) => ({
	authGroup: one(authGroup, {
		fields: [authGroupPermissions.groupId],
		references: [authGroup.id],
	}),
	authPermission: one(authPermission, {
		fields: [authGroupPermissions.permissionId],
		references: [authPermission.id],
	}),
}))

export const authGroupRelations = relations(authGroup, ({ many }) => ({
	authGroupPermissions: many(authGroupPermissions),
}))

export const reportsRelations = relations(reports, ({ one, many }) => ({
	userAccount_moderatorId: one(userAccount, {
		fields: [reports.moderatorId],
		references: [userAccount.id],
		relationName: 'reports_moderatorId_userAccount_id',
	}),
	userAccount_reporterId: one(userAccount, {
		fields: [reports.reporterId],
		references: [userAccount.id],
		relationName: 'reports_reporterId_userAccount_id',
	}),
	userAccount_reportedUserId: one(userAccount, {
		fields: [reports.reportedUserId],
		references: [userAccount.id],
		relationName: 'reports_reportedUserId_userAccount_id',
	}),
	blog: one(blog, {
		fields: [reports.reportedBlogId],
		references: [blog.id],
	}),
	reportFlags: many(reportFlags),
}))

export const permissionsGrantedRelations = relations(permissionsGranted, ({ one }) => ({
	userRole: one(userRole, {
		fields: [permissionsGranted.roleId],
		references: [userRole.id],
	}),
	permission: one(permissions, {
		fields: [permissionsGranted.permissionId],
		references: [permissions.permissionId],
	}),
}))

export const permissionsRelations = relations(permissions, ({ many }) => ({
	permissionsGranteds: many(permissionsGranted),
}))

export const userInterestRelations = relations(userInterest, ({ one }) => ({
	userAccount: one(userAccount, {
		fields: [userInterest.userId],
		references: [userAccount.id],
	}),
	topic: one(topics, {
		fields: [userInterest.topicsId],
		references: [topics.id],
	}),
}))

export const userNotificationPreferencesRelations = relations(
	userNotificationPreferences,
	({ one }) => ({
		userAccount: one(userAccount, {
			fields: [userNotificationPreferences.userId],
			references: [userAccount.id],
		}),
		notificationChannel: one(notificationChannel, {
			fields: [userNotificationPreferences.channelId],
			references: [notificationChannel.id],
		}),
	})
)

export const reportFlagsRelations = relations(reportFlags, ({ one }) => ({
	report: one(reports, {
		fields: [reportFlags.reportId],
		references: [reports.reportId],
	}),
	userAccount: one(userAccount, {
		fields: [reportFlags.userId],
		references: [userAccount.id],
	}),
}))
