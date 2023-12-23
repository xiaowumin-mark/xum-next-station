;(function(){function hSdrop(options){var self=this;self=$.extend(self,{els:'',},options);$(self.els).click(function(e){self.init(this);})}
hSdrop.prototype={init:function(el){var kl=''
kl+='<div class="select-moob">'
kl+='<div class="select-moob-cover"></div>'
kl+='<div class="select-moob-container">'
kl+='	<div class="x12 select-moob-title">'
kl+='		<div class="cancel">取消</div>'
kl+='		<div class="determine">确定</div>'
kl+='	</div>'
kl+='	<div class="x12 select-moob-content">'
kl+='		<div class="swiper-container sw-select">'
kl+='			<div class="swiper-wrapper">'
var dob=$(el).next().children();for(var i=0;i<dob.length;i++){kl+='		<div class="swiper-slide" vid="'+$(dob[i]).attr('vid')+'">'+$(dob[i]).html()+'</div>'}
kl+='			</div>'
kl+='		</div>'
kl+='	</div>'
kl+='</div>'
kl+='</div>'
$('body').append(kl);var swipersff=new Swiper('.sw-select',{direction:'vertical',autoHeight:true,slidesPerView:3,centeredSlides:true,observer:true,observeParents:true,observeSlideChildren:true,});$('.sw-select .swiper-wrapper>div').click(function(e){swipersff.slideTo($(this).index(),500,false);});$('.select-moob .cancel,.select-moob-cover').click(function(e){$('.select-moob').remove();});$('.select-moob .determine').click(function(e){$(el).children('input').val($('.sw-select .swiper-slide-active').html());$(el).children('input').attr('value',$('.sw-select .swiper-slide-active').attr('vid'));$('.select-moob').remove();})},}
window.hSdrop=hSdrop;}());