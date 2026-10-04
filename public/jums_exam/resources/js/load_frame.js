function load_frame_outer(frame_name,url)
    {
        document.getElementById(frame_name).src = url;
    }
    
function load_frame_inner(frame_name,url)
    {
        window.parent.document.getElementById(frame_name).src = url;
    }    
    
function resizeIframe(obj) 
    {
    obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
    }     