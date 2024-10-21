// next-sitemap.config.js

module.exports = {
  siteUrl: process.env.SITE_URL || "https://aipex.quest", // 你的网站URL
  generateRobotsTxt: true, // 是否生成 robots.txt 文件
  sitemapSize: 7000, // 站点地图的大小
  exclude: ["/server-sitemap.xml"], // 排除某些路径
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: ["/admin", "/login"], // 禁止某些路径
      },
    ],
    additionalSitemaps: [
      `${process.env.SITE_URL}/server-sitemap.xml`, // 额外的站点地图
    ],
  },
};
