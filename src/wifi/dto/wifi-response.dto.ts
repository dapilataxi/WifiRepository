export class WifiResponseDto {
    mac: string;
    user: string;
    location: string;
    device: string;
    config: {
      welcome_title: string;
      welcome_html: string;
      facebook_login: string;
      formulario_login: string;
      staff_login: string;
      staff_pin_md5: string | null;
      css_button_color: string;
      css_button_text_color: string;
      css_button_text_size: string;
      powered_by_node: string;
      multiple_registers: string;
      auto_redirect_url: string;
      disclaimer_html: string;
      disclaimer_short: string;
      welcome_css: string;
    };
  }
  