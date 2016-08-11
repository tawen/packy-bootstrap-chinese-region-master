# bootstrap-chinese-region

基于bootstrap的中国地区（行政区）选择器

## 例子

[Example](http://bootstrap-chinese-region.coding.io/)

html结构
	
	<head>
		<link rel="stylesheet" href="lib/bootstrap/bootstrap.css">
		<link rel="stylesheet" href="lib/bootstrap-chinese-region/bootstrap-chinese-region.css">
	<head/>

	<div class="form-group">
		<label for="address">地区</label>
		<div class="bs-chinese-region flat dropdown" data-submit-type="id" data-min-level="1" data-max-level="3">
			<input type="text" class="form-control" name="address" id="address" placeholder="选择你的地区" data-toggle="dropdown" readonly="" value="440103">
			<div class="dropdown-menu" role="menu" aria-labelledby="dLabel">
				<div>
					<ul class="nav nav-tabs" role="tablist">
						<li role="presentation" class="active"><a href="#province" data-next="city" role="tab" data-toggle="tab">省份</a></li>
						<li role="presentation"><a href="#city" data-next="district" role="tab" data-toggle="tab">城市</a></li>
						<li role="presentation"><a href="#district" data-next="street" role="tab" data-toggle="tab">县区</a></li>
					</ul>
					<div class="tab-content">
						<div role="tabpanel" class="tab-pane active" id="province">--</div>
						<div role="tabpanel" class="tab-pane" id="city">--</div>
						<div role="tabpanel" class="tab-pane" id="district">--</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<script type="text/javascript" src="lib/jquery/jquery.js"></script>
	<script type="text/javascript" src="lib/bootstrap/bootstrap.js"></script>
	<script type="text/javascript" src="lib/bootstrap-chinese-region/bootstrap-chinese-region.js"></script>

js代码

	<script type="text/javascript">
		$.getJSON('lib/bootstrap-chinese-region/sql_areas.json',function(data){
			
			/**重定义数据结构**/
			/**
			 * id 键,name 名字,level 层级,parentId 父级
			 */
			for (var i = 0; i < data.length; i++) {
				var area = {id:data[i].id,name:data[i].cname,level:data[i].level,parentId:data[i].upid};
				data[i] = area;
			}

			$('.bs-chinese-region').chineseRegion('source',data);//导入数据并实例化
		});
	</script>

##方法

显示（或隐藏）下拉框	
`$('.bs-chinese-region').chineseRegion('toggle')`

导入数据	
`$('.bs-chinese-region').chineseRegion('source',data)`

取得数据	
`$('.bs-chinese-region').chineseRegion('source')`

设置地区有效层级（显示与获得的地区层级范围）	
`$('.bs-chinese-region').chineseRegion('level',min,max)`

重绘地区选择器	
`$('.bs-chinese-region').chineseRegion('render',id)`

> 传入id 则自动选择层级范围内的id地区及父级地区
> 没传入id 则重绘地区层级范围最小地区

##事件
当选择了地区后促发`changed.bs.chinese-region`事件

	$('.bs-chinese-region').chineseRegion('source',data).on('changed.bs.chinese-region',function(e,areas){
		//areas是已选择的地区数据，按先选择的在最前的方式排序。
	});


当选择了最后的层级地区后促发`completed.bs.chinese-region`事件

	$('.bs-chinese-region').chineseRegion('source',data).on('completed.bs.chinese-region',function(e,areas){
		//areas是已选择的地区数据，按先选择的在最前的方式排序。
	});

##其他
在`bs-chinese-region`元素中设置以下`data-`属性会自动加载内容

	data-submit-type="id" //设置id，提交表单时会自动把input的值改为层级最下层的地区id
	data-min-level="1" //设定最上层
	data-max-level="3" //设定最下层