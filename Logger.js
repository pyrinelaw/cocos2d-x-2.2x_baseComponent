/**
 * @author  Petrus.Law (petrus.law@outlook.com)
 * @date    2014-03-22 21:00:10
 * @desc    日志打印控件
 * Levels:
 * 0 Disable
 * 1 Error
 * 2 Warning
 * 3 Info
 * 4 Debug
 */


var Logger = Logger || {};

/**
 * 默认日志输出等级
 * @API private
 */
Logger.level = 4;

/**
 * 日志输出方式
 * @API private
 */
Logger.type = null;

/**
 * 设置日志输出地等级
 * @API public
 */
Logger.setLevel = function(level) {
	Logger.level = level;
}

/**
 * 打印调试日志
 * @API public
 */
Logger.debug = function(msg) {
	if (Logger.level >= 4) {
		cc.log("[debug] "+ msg);
	}
}

/**
 * 打印一般日志
 * @API public
 */
Logger.info = function(msg) {
	if (Logger.level >= 3) {
		cc.log("[info] "+ msg);
	}
}

/**
 * 打印警告日志
 * @API public
 */
Logger.warn = function(msg) {
	if (Logger.level >= 2) {
		cc.log("[warning] "+ msg);
	}
}

/**
 * 打印警告日志
 * @API public
 */
Logger.error = function(msg) {
	if (Logger.level >= 1) {
		cc.log("[error] "+ msg);
	}
}