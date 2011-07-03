﻿using System;
using System.Collections.Generic;
using System.Linq;
using Ivony.Fluent;

namespace Ivony.Html
{

  /// <summary>
  /// 提供元素导航查询的扩展方法
  /// </summary>
  public static class NavigateExtensions
  {


    private static void EnsureAvaliable( IHtmlNode node )
    {
      if ( node.Container == null )
        throw new InvalidOperationException( "无法对不存在于 DOM 上的节点进行操作" );
    }



    /// <summary>
    /// 获取父元素
    /// </summary>
    /// <param name="node">要获取父元素的节点</param>
    /// <returns>父元素</returns>
    public static IHtmlElement Parent( this IHtmlNode node )
    {

      EnsureAvaliable( node );

      return node.Container as IHtmlElement;
    }




    /// <summary>
    /// 获取容器所有子元素
    /// </summary>
    /// <param name="container">要获取子元素的容器</param>
    /// <returns>容器的所有子元素</returns>
    public static IEnumerable<IHtmlElement> Elements( this IHtmlContainer container )
    {
      return container.Nodes().OfType<IHtmlElement>();
    }


    /// <summary>
    /// 获取容器符合条件的子元素
    /// </summary>
    /// <param name="container">要获取子元素的容器</param>
    /// <param name="selector">用来筛选子元素的元素选择器</param>
    /// <returns>符合条件的子元素</returns>
    public static IEnumerable<IHtmlElement> Elements( this IHtmlContainer container, string selector )
    {
      return CssElementSelector.Create( selector ).Filter( Elements( container ) );
    }

    /// <summary>
    /// 获取节点的所有父代元素
    /// </summary>
    /// <param name="node">要获取父代元素集合的节点</param>
    /// <returns>节点的所有父代元素集合</returns>
    public static IEnumerable<IHtmlElement> Ancestors( this IHtmlNode node )
    {

      EnsureAvaliable( node );

      while ( true )
      {
        var element = node.Parent();


        if ( element == null )
          yield break;

        yield return element;


        node = element;

      }
    }

    /// <summary>
    /// 获取节点符合条件的父代元素
    /// </summary>
    /// <param name="node">要获取父代元素集合的节点</param>
    /// <param name="selector">用来筛选父代元素的元素选择器</param>
    /// <returns>节点的所有父代元素集合</returns>
    public static IEnumerable<IHtmlElement> Ancestors( this IHtmlNode node, string selector )
    {
      return CssElementSelector.Create( selector ).Filter( Ancestors( node ) );
    }

    /// <summary>
    /// 获取元素所有的父代元素以及元素自身
    /// </summary>
    /// <param name="element">要获取父代元素及自身的元素</param>
    /// <returns>元素的所有父代元素和自身的集合</returns>
    public static IEnumerable<IHtmlElement> AncestorsAndSelf( this IHtmlElement element )
    {

      EnsureAvaliable( element );

      while ( true )
      {
        if ( element == null )
          yield break;

        yield return element;

        element = element.Parent();
      }
    }



    /// <summary>
    /// 获取所有的子代元素
    /// </summary>
    /// <param name="container">要获取子代元素的容器对象</param>
    /// <returns>容器所有的子代元素</returns>
    public static IEnumerable<IHtmlElement> Descendants( this IHtmlContainer container )
    {
      return container.DescendantNodes().OfType<IHtmlElement>();
    }

    /// <summary>
    /// 获取所有的子代元素
    /// </summary>
    /// <param name="container">要获取子代元素的容器对象</param>
    /// <param name="selector">用于筛选子代元素的选择器</param>
    /// <returns>符合选择器的容器的所有子代元素</returns>
    /// <remarks>与Find方法不同的是，Descendants方法的选择器会无限上溯，即当判断父代约束时，会无限上溯到文档根。而Find方法只会上溯到自身的子节点</remarks>
    public static IEnumerable<IHtmlElement> Descendants( this IHtmlContainer container, string selector )
    {
      return CssSelector.Create( selector ).Filter( Descendants( container ) );
    }

    /// <summary>
    /// 获取所有的子代节点
    /// </summary>
    /// <param name="container">要获取子代元素的容器对象</param>
    /// <returns>容器所有的子代节点</returns>
    public static IEnumerable<IHtmlNode> DescendantNodes( this IHtmlContainer container )
    {

      foreach ( var node in container.Nodes() )
      {
        yield return node;

        var childContainer = node as IHtmlContainer;
        if ( childContainer != null )
        {
          foreach ( var descendantNode in DescendantNodes( childContainer ) )
            yield return descendantNode;
        }
      }

    }



    /// <summary>
    /// 获取所有的兄弟（同级）节点
    /// </summary>
    /// <param name="node">要获取兄弟节点的节点</param>
    /// <returns>所有的兄弟节点</returns>
    /// <exception cref="System.InvalidOperationException">如果节点不属于任何 HTML 容器</exception>
    public static IEnumerable<IHtmlNode> SiblingNodes( this IHtmlNode node )
    {

      EnsureAvaliable( node );

      return node.Container.Nodes();

    }

    /// <summary>
    /// 获取所有的兄弟（同级）元素节点
    /// </summary>
    /// <param name="node">要获取兄弟（同级）元素节点的节点</param>
    /// <returns>所有的兄弟（同级）元素节点</returns>
    public static IEnumerable<IHtmlElement> Siblings( this IHtmlNode node )
    {
      return node.SiblingNodes().OfType<IHtmlElement>();
    }

    /// <summary>
    /// 获取所有的兄弟（同级）元素节点
    /// </summary>
    /// <param name="node">要获取兄弟（同级）元素节点的节点</param>
    /// <param name="selector">用于筛选元素的元素选择器</param>
    /// <returns>所有的兄弟（同级）元素节点</returns>
    public static IEnumerable<IHtmlElement> Siblings( this IHtmlNode node, string selector )
    {
      return CssElementSelector.Create( selector ).Filter( node.Siblings() );
    }


    /// <summary>
    /// 获取在自身之前的所有兄弟（同级）节点
    /// </summary>
    /// <param name="node">要获取之前的兄弟（同级）节点的节点</param>
    /// <returns>在这之后的所有兄弟（同级）节点</returns>
    public static IEnumerable<IHtmlNode> SiblingNodesBeforeSelf( this IHtmlNode node )
    {
      return node.SiblingNodes().TakeWhile( n => !n.RawObject.Equals( node.RawObject ) );
    }

    /// <summary>
    /// 获取在之后的所有兄弟（同级）节点
    /// </summary>
    /// <param name="node">要获取之后的兄弟（同级）节点的节点</param>
    /// <returns>之后的所有兄弟（同级）节点</returns>
    public static IEnumerable<IHtmlNode> SiblingNodesAfterSelf( this IHtmlNode node )
    {
      return node.SiblingNodes().SkipWhile( n => !n.RawObject.Equals( node.RawObject ) ).Skip( 1 );
    }


    /// <summary>
    /// 获取在自身之前的所有兄弟（同级）元素节点
    /// </summary>
    /// <param name="node">要获取之前的兄弟（同级）元素节点的节点</param>
    /// <returns>在这之后的所有兄弟（同级）元素节点</returns>
    public static IEnumerable<IHtmlElement> SiblingsBeforeSelf( this IHtmlNode node )
    {
      return node.SiblingNodesBeforeSelf().OfType<IHtmlElement>();
    }

    /// <summary>
    /// 获取在之后的所有兄弟（同级）元素节点
    /// </summary>
    /// <param name="node">要获取之后的兄弟（同级）元素节点的节点</param>
    /// <returns>之后的所有兄弟（同级）元素节点</returns>
    public static IEnumerable<IHtmlElement> SiblingsAfterSelf( this IHtmlNode node )
    {
      return node.SiblingNodesAfterSelf().OfType<IHtmlElement>();
    }




    /// <summary>
    /// 获取紧邻之前的元素
    /// </summary>
    /// <param name="node">要获取紧邻之前的元素的节点</param>
    /// <returns>紧邻当前节点的前一个元素</returns>
    public static IHtmlElement PreviousElement( this IHtmlNode node )
    {
      return node.SiblingsBeforeSelf().LastOrDefault();
    }


    /// <summary>
    /// 获取紧邻之后的元素
    /// </summary>
    /// <param name="node">要获取紧邻之后的元素的节点</param>
    /// <returns>紧邻当前节点的后一个元素</returns>
    public static IHtmlElement NextElement( this IHtmlNode node )
    {
      return node.SiblingsAfterSelf().FirstOrDefault();
    }


    /// <summary>
    /// 获取紧邻之前的节点
    /// </summary>
    /// <param name="node">要获取紧邻之前的元素的节点</param>
    /// <returns>紧邻当前节点的前一个节点</returns>
    public static IHtmlNode PreviousNode( this IHtmlNode node )
    {
      return node.SiblingNodesBeforeSelf().LastOrDefault();
    }

    /// <summary>
    /// 获取紧邻之后的节点
    /// </summary>
    /// <param name="node">要获取紧邻之后的元素的节点</param>
    /// <returns>紧邻当前节点的后一个节点</returns>
    public static IHtmlNode NextNode( this IHtmlNode node )
    {
      return node.SiblingNodesAfterSelf().FirstOrDefault();
    }


    /// <summary>
    /// 从当前容器按照CSS3选择器搜索符合要求的元素
    /// </summary>
    /// <param name="container">要搜索子代元素的容器</param>
    /// <param name="expression">CSS选择器</param>
    /// <returns>搜索到的符合要求的元素</returns>
    public static IEnumerable<IHtmlElement> Find( this IHtmlContainer container, string expression )
    {
      if ( container == null )
        throw new ArgumentNullException( "container" );

      return CssSelector.Search( expression, container );
    }


    /// <summary>
    /// 从当前容器按照CSS3选择器搜索符合要求的唯一元素，如果有多个元素符合要求，则会引发异常。
    /// </summary>
    /// <param name="container">要搜索子代元素的容器</param>
    /// <param name="expression">CSS选择器</param>
    /// <returns>搜索到的符合要求的唯一元素</returns>
    public static IHtmlElement FindSingle( this IHtmlContainer container, string expression )
    {
      if ( container == null )
        throw new ArgumentNullException( "container" );

      try
      {
        return Find( container, expression ).Single();
      }
      catch ( Exception e )
      {
        if ( e.Data != null && !e.Data.Contains( "Ivony.Html.CssQuery.Expression" ) )
          e.Data["selector expression"] = expression;

        throw;
      }
    }


    /// <summary>
    /// 获取在兄弟节点中，自己的顺序位置
    /// </summary>
    /// <param name="node">要获取序号的节点</param>
    /// <returns>顺序位置</returns>
    public static int NodesIndexOfSelf( this IHtmlNode node )
    {
      var siblings = node.SiblingNodes();
      return siblings.ToList().IndexOf( node );
    }


    /// <summary>
    /// 获取在兄弟元素中，自己的顺序位置
    /// </summary>
    /// <param name="element">要获取序号的元素</param>
    /// <returns>顺序位置</returns>
    public static int ElementsIndexOfSelf( this IHtmlElement element )
    {
      var siblings = element.Siblings();
      return siblings.ToList().IndexOf( element );
    }


    /// <summary>
    /// 在元素集所有子代元素中使用 CSS 选择器选出符合要求的元素
    /// </summary>
    /// <param name="elements">作为选择范围的元素集</param>
    /// <param name="expression">CSS 选择器表达式</param>
    /// <returns>符合选择器的所有子代</returns>
    public static IEnumerable<IHtmlElement> Find( this IEnumerable<IHtmlElement> elements, string expression )
    {
      if ( !elements.Any() )
        return Enumerable.Empty<IHtmlElement>();

      if ( elements.IsSingle() )
        return elements.Single().Find( expression );

      var document = elements.First().Document;

      if ( elements.Any( e => !e.Document.Equals( document ) ) )
        throw new InvalidOperationException( "不支持在不同的文档中搜索" );

      var selector = CssCasecadingSelector.Create( expression, elements );

      return selector.Filter( document.Descendants() );

    }


  }
}
